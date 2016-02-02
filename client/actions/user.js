export const SET_USER_SCORE = 'SET_USER_SCORE';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';

export function fetchUserScore (user_id) {
  console.log('fetching user score');
  return function (dispatch) {
    let request = new Request(`/api/matchmakerScore/${user_id}`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setUserScore(json)));
  };
}

export function setUserScore (userScore) {
  console.log('the user score is', userScore);
  return {
    type: SET_USER_SCORE,
    userScore: userScore
  };
}
