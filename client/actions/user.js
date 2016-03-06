export const SET_USER_SCORE = 'SET_USER_SCORE';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const CHANGE_INDEX = 'CHANGE_INDEX';

// Fetches the info of the connections the user has helped create as well as user's points total
export const fetchUserScore = (user_id) => {
  return (dispatch) => {
    const request = new Request(`/api/users/${user_id}/results`, { method: 'GET' });
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setUserScore(json)));
  };
};

// sets the userResult data (connections made, score etc.)
export const setUserScore = (userScore) => {
  return {
    type: SET_USER_SCORE,
    userScore
  };
};

// tells state the updated user info is being sent to server
const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    isFetching: true,
    userInfo
  };
};

// sets the user's information in state to be the info received
const receiveUserInfo = (userInfo) => {
  return {
    type: RECEIVE_USER_INFO,
    isFetching: false,
    userInfo
  };
};

// tells the server to update user info with new info and then returns said info opon request completion
export const updateUserInfo = (userID, userInfo) => {
  return dispatch => {
    dispatch(setUserInfo(userInfo));
    const request = new Request(`/api/users/${userID}`, {
      method: 'put',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo)
    });
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveUserInfo(json)));
  };
};

// Changes the index (which connection) is displayed in the UserScore component based on either keypresses
// or on the number to incrememnt or decrement index by. NOTE that change is relative to current index

export const changeIndex = (e) => {
  let indexChange;
  if (typeof e === 'number') {
    indexChange = e;
  } else if (e.keyCode === 39) {
    indexChange = 1;
  } else if (e.keyCode === 37) {
    indexChange = -1;
  } else {
    indexChange = 0;
  }
  return dispatch => {
    dispatch(changeIndexAction(indexChange));
  };
};

// Updates index for UserScore in state. indexChange increments or decrements index according to it's val
export const changeIndexAction = (indexChange) => {
  return {
    type: CHANGE_INDEX,
    indexChange
  };
};
