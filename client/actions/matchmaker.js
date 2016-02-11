import fetch from 'isomorphic-fetch';

////////////////////////
// Login Related Code //
////////////////////////

// There are three possible states for our login
// process and we need actions for each of them


//////////////////
// User actions //
//////////////////

export const CHOOSE_MATCH = 'CHOOSE_MATCH';

var createClickTracker = function () {
  var lastClick = 0;
  return function () {
    if ((Date.now() - lastClick) > 1000) {
      lastClick = Date.now();
      return true;
    }
    return false;
  }
}

var clickTracker = createClickTracker();

export function chooseMatch(target, prospect, user_id, triads) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  
  if (clickTracker()) {
    return function (dispatch) {

      // Fetch our target
      // TODO: also fetch our prospects
      dispatch(updateScore(10));
      dispatch(getNewCandidates(user_id, triads));
      let request = new Request('/api/pairs/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({matchmaker: {user_id: user_id}, pair: {target:  target, prospect: prospect }})
      });
      return fetch(request)
        .then(response => response.json())
        .then((json) => {
          if (json && json.score) {
            dispatch(updateScore(json.score));
          }
                    
        });
    }
  } else {
    return function (dispatch) {

    }
  }
}


var createTriadTracker = function () {
  var last = 0;
  return function () {
    if ((Date.now() - last) > 4000) {
      last = Date.now();
      return true;
    }
    return false;
  }
}

var triadTracker = createTriadTracker();

export const GET_NEW_CANDIDATES = 'GET_NEW_CANDIDATES';

export function getNewCandidates(user_id, triads) {
  user_id = user_id || 0;
  return function(dispatch) {
    dispatch(requestTriad())
    // triads array version of the app
    //if (triads.length < 3 && triadTracker()) {
      let request = new Request('/api/candidates/' + user_id, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      return fetch(request)
        .then(response => response.json())
        .then((json) => {
          dispatch(receiveTriads(json));
        });
    //}
  };
}

export const BUY_CANDIDATE = 'BUY_CANDIDATE';

export function buyCandidate(candidate, user, scoreChange, triads) {
  return function(dispatch) {
    dispatch(updateScore(scoreChange));
    dispatch(getNewCandidates(user, triads));
    let request = new Request('/api/purchases/candidate', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({candidate: candidate, user: user, scoreChange: scoreChange})
    });
    return fetch(request)
      .then(response => response.json())
      .then((score) => {
        dispatch(setScore(score));
      });
  }
}

export const UPDATE_SCORE = 'UPDATE_SCORE';

function updateScore(scoreChange) {
  console.log("GOT INTO HERE");
  return {
    type: UPDATE_SCORE,
    scoreChange: scoreChange
  };
}

export const SET_SCORE = 'SET_SCORE';

function setScore(score) {
  return {
    type: SET_SCORE,
    score: score
  };
}

///////////////////
// Network requests
///////////////////


// TARGET

export const REQUEST_TRIAD = 'REQUEST_TRIAD';

function requestTriad() {
  console.log("requestTriad called");
  return {
    type: REQUEST_TRIAD,
    isFetching: true
  };
}
export const RECEIVE_TRIADS = 'RECEIVE_TRIADS';

function receiveTriads(json) {
  console.log("These are the recieved triads", json);
  return {
    type: RECEIVE_TRIADS,
    triads: json,
    isFetching: false,
    receivedAt: Date.now()
  };
}


// The code below is a workaround do to something odd with redux
export const CHANGE_INDEX = 'CHANGE_INDEX';

export const changeIndex = (newIndex) => {
  return dispatch => {
    dispatch(changeIndexAction(newIndex));
  }
}

export const changeIndexAction = (newIndex) => {
  return {
    type: CHANGE_INDEX,
    index: newIndex
  }
}