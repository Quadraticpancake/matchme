export const SET_USER_SCORE = 'SET_USER_SCORE';
export const FETCH_USER_SCORE = 'FETCH_USER_SCORE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
export const CHANGE_INDEX = 'CHANGE_INDEX';

export function fetchUserScore (user_id) {
  return function (dispatch) {
    let request = new Request(`/api/users/${user_id}/matchmakerScore`, {method: 'GET'});
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(setUserScore(json)));
  };
}

export function setUserScore (userScore) {
  return {
    type: SET_USER_SCORE,
    userScore: userScore
  };
}

const setUserInfo = (userInfo) => {
  return {
    type: SET_USER_INFO,
    isFetching: true,
    userInfo
  };
};

const receiveUserInfo = (userInfo) => {
  return {
    type: RECEIVE_USER_INFO,
    isFetching: false,
    userInfo
  };
};


export const updateUserInfo = (userID, userInfo) => {
  return dispatch => {
    dispatch(setUserInfo(userInfo));
    let request = new Request(`/api/users/${userID}`, {
      method: 'put',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(userInfo)
    });
    return fetch(request)
      .then(response => response.json())
      .then(json => dispatch(receiveUserInfo(json)));
  };
};

export const changeIndex = (e) => {
  var indexChange;
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
  }
}

export const changeIndexAction = (indexChange) => {
  return {
    type: CHANGE_INDEX,
    indexChange: indexChange
  }
}
