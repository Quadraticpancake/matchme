import db from './config';

export function getMessagesForUser(user_id) {
	return db.query(
	`select messages.*\n\
	from messages\n\
	inner join pairs on messages.pair_id=pairs.pair_id\n\
	inner join users on users.user_id=pairs.user_one or users.user_id=pairs.user_two\n\
	where users.user_id=${user_id};`)
}

export function getConnectedPairsAndMessagesForUser(user_id) {
	return db.query(
		`select pairs.*, messages.sender, messages.text, messages.created_at, users.*\n\
		from messages\n\
		full outer join pairs on messages.pair_id=pairs.pair_id\n\
		inner join users on users.user_id=pairs.user_one or users.user_id=pairs.user_two\n\
		where users.user_id=${user_id} and pairs.connected=false;` //for testing purposes, pairs.connected=false. Set it to true for production.
	).then((rows) => {
		// organize messages by pair
		var allPairs = {};
		rows.forEach((row) => {
			if (allPairs[row.pair_id] === undefined) {
				allPairs[row.pair_id] = {}
				allPairs[row.pair_id]['user_one'] = row.user_one
				allPairs[row.pair_id]['user_two'] = row.user_two
				allPairs[row.pair_id]['messages'] = row.text ? [{created_at: row.created_at, sender: row.sender, text: row.text}] : []
			} else {
				allPairs[row.pair_id]['messages'].push({created_at: row.created_at, sender: row.sender, text: row.text})
			}
		});

		return allPairs;
	})
}

export function addMessage(msgObj) {
	var currentTime = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');

	return db.query(
		`insert into messages (pair_id, sender, text, created_at) values(${msgObj.pair_id}, ${msgObj.sender}, '${msgObj.text}', '${currentTime}');`
	).catch((err) => { throw new Error(err); })
}