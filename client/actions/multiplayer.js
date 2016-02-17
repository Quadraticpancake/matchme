import fetch from 'isomorphic-fetch';

export const UPDATE_GAME_STATE = 'UPDATE_GAME_STATE';

export const updateGameState = (gameState) => {
  return {
    type: UPDATE_GAME_STATE,
    updatedGameState: gameState
  };
};

// need a special update score function for multiplayer since the single player will update score every time they choose a match
export const updateScore = (user_id) => {
	return (dispatch) => {

    const request = new Request(`/api/candidates/${user_id}`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });

  return fetch(request)
    .then(response => response.json())
    .then((json) => {
      dispatch(setScore(json.score));
    });
	};
};

const SET_SCORE = 'SET_SCORE';

const setScore = (score) => {
  return {
    type: SET_SCORE,
    score
  };
};