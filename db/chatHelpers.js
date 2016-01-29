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
	)
}

export function addMessage(msgObj) {
	// return db.query(
	// 	`insert into messages (pair_id, sender, text, created_at) values(${msgObj}`
	// )
}