import db from './config';
import { uniq } from 'underscore';

export function getMessagesForUser(user_id) {
	return db.query(
	`select messages.*\n\
	from messages\n\
	inner join pairs on messages.pair=pairs.pair_id\n\
	inner join users on users.user_id=pairs.user_one or users.user_id=pairs.user_two\n\
	where users.user_id=${user_id};`)
}

export function getConnectedPairsAndMessagesForUser(user_id) {
	return db.query(
		`select pairs.*, messages.*, users.*\n\
		from messages\n\
		full outer join pairs on messages.pair=pairs.pair_id\n\
		inner join users on users.user_id=pairs.user_one or users.user_id=pairs.user_two\n\
		where pairs.user_one=${user_id} or pairs.user_two=${user_id} and pairs.connected=true and pairs.closed=false;` //for testing purposes, pairs.connected=false. Set it to true for production.
	).then((rows) => {
		// organize messages by pair

		var allPairs = {};
		rows.forEach((row) => {
			if (allPairs[row.pair_id] === undefined) {
				allPairs[row.pair_id] = {};
				allPairs[row.pair_id]['user_one'] = allPairs[row.pair_id]['user_one'] ? allPairs[row.pair_id]['user_one'] : row;
				allPairs[row.pair_id]['messages'] = row.text !== '' ? [{messages_id: row.messages_id, created_at: row.created_at, sender: row.sender, text: row.text}] : [];
			} else {
				allPairs[row.pair_id]['user_two'] = allPairs[row.pair_id]['user_one'].first_name === row.first_name ? '' : row;
				allPairs[row.pair_id]['messages'].push({messages_id: row.messages_id, created_at: row.created_at, sender: row.sender, text: row.text});
			}
		});

		for (let pair in allPairs) {
			allPairs[pair].pairHeart = allPairs[pair].user_one.user_one_heart && allPairs[pair].user_one.user_two_heart;
			allPairs[pair].userHeart = user_id === allPairs[pair].user_one.user_id ? allPairs[pair].user_one.user_one_heart : allPairs[pair].user_one.user_two_heart;
			delete allPairs[pair].user_one.pair_id;
			delete allPairs[pair].user_one.user_one;
			delete allPairs[pair].user_one.user_two;
			delete allPairs[pair].user_one.times_matched;
			delete allPairs[pair].user_one.connected;
			delete allPairs[pair].user_one.messages_id;
			delete allPairs[pair].user_one.pair;
			delete allPairs[pair].user_one.sender;
			delete allPairs[pair].user_one.text;
			delete allPairs[pair].user_one.created_at;
			delete allPairs[pair].user_one.user_one_heart;
			delete allPairs[pair].user_one.user_two_heart;

			delete allPairs[pair].user_two.pair_id;
			delete allPairs[pair].user_two.user_one;
			delete allPairs[pair].user_two.user_two;
			delete allPairs[pair].user_two.times_matched;
			delete allPairs[pair].user_two.connected;
			delete allPairs[pair].user_two.messages_id;
			delete allPairs[pair].user_two.pair;
			delete allPairs[pair].user_two.sender;
			delete allPairs[pair].user_two.text;
			delete allPairs[pair].user_two.created_at;
			delete allPairs[pair].user_two.user_one_heart;
			delete allPairs[pair].user_two.user_two_heart;

			var dedupedMessages = uniq(allPairs[pair].messages, function(x){
		    return x.messages_id;
			});

			allPairs[pair].messages = dedupedMessages;

			if (allPairs[pair].messages.length === 1) {
				if (allPairs[pair].messages[0].messages_id === null) {
					allPairs[pair].messages = [];
				}
			}

		}

		return allPairs;
	});
}

export function addMessage(msgObj) {
	var currentTime = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
    var text = '';
    // single quotes need to be "escaped" with an additional single quote when inserting into postgres DB
    for (var i = 0; i < msgObj.text.length; i++) {
      if (msgObj.text.charAt(i) === "'") {
      	text += "''";
      } else {
      	text += msgObj.text.charAt(i);
      }
    }
    var q = `insert into messages (pair, sender, text, created_at) values(${msgObj.pair_id}, ${msgObj.sender}, '${text}', '${currentTime}');`
	return db.query(q).catch((err) => { throw new Error(err); })
}

export function updateHeart(user, pair, is_user_one) {
	console.log('about to update', is_user_one);
	if (is_user_one) {
	  return db.query(`update pairs set user_one_heart = not user_one_heart where pair_id = ${ pair } returning user_one_heart, user_two_heart;`)
	  .then((row) => {
	  	return {userHeart: row[0].user_one_heart, pairHeart: row[0].user_one_heart && row[0].user_two_heart};
	  });	  
	} else {
	  return db.query(`update pairs set user_two_heart = not user_two_heart where pair_id = ${ pair } returning user_one_heart, user_two_heart;`)
	  .then((row) => {
	  	console.log('got to here2')
	  	return {userHeart: row[0].user_two_heart, pairHeart: row[0].user_one_heart && row[0].user_two_heart};
	  });
	}
} 

export function closeChat(pair_id) {
  var closeChatQuery = `with d as (delete from messages where pair = ${ pair_id }) update pairs set \
    closed = true where pair_id = ${ pair_id } returning pair_id;`
  console.log(closeChatQuery);
  return db.query(closeChatQuery)
    .then((row) => {
      return row[0].pair_id;
    }); 
}