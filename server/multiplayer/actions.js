import { getMatchSet } from '../../db/dbHelpers';
export const NEW_PLAYER_JOIN = 'NEW_PLAYER_JOIN';
export const NEW_MATCH_SET = 'NEW_MATCH_SET';

export function newPlayerJoin(user_id) {
	return {
		type: NEW_PLAYER_JOIN,
		newPlayer: user_id
	}
}

export function getNextMatchSet() {
	getMatchSet(1).then((matchSet) => { 
		return {
			type: NEW_MATCH_SET,
			newMatchSet: matchSet
		}
	});
}

export const SET_VOTE = 'SET_VOTE';