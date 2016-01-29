import db from './config';

export function getMessagesForUser(user_id) {
	return db.query(
	`select messages.*\n\
	from messages\n\
	inner join pairs on messages.pair_id=pairs.pair_id\n\
	inner join users on users.user_id=pairs.user_one or users.user_id=pairs.user_two\n\
	where users.user_id=${user_id};`)
}
