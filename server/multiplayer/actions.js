import '../../db/dbHelpers'
export const NEW_PLAYER_JOIN = 'NEW_PLAYER_JOIN';

export function newPlayerJoin(user_id) {
	return {
		type: NEW_PLAYER_JOIN,
		newPlayer: user_id
	}
}