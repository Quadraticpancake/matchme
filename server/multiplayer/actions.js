import { getMatchSet } from '../../db/dbHelpers';
export const NEW_PLAYER_JOIN = 'NEW_PLAYER_JOIN';
export const NEW_MATCH_SET = 'NEW_MATCH_SET';
export const DECREMENT_TIMER = 'DECREMENT_TIMER';
export const RESET_TIMER = 'RESET_TIMER';

export function newPlayerJoin(userId) {
  return {
    type: NEW_PLAYER_JOIN,
    newPlayer: userId
  };
}

export function getNextMatchSet() {
  getMatchSet(1).then((matchSet) => {
    return {
      type: NEW_MATCH_SET,
      newMatchSet: matchSet
    };
  });
}

export const SET_VOTE = 'SET_VOTE';
