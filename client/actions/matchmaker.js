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

export function chooseMatch(target, prospect, user_id) {
  console.log('chooseMatch called');
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  console.log(user_id);
  return function(dispatch) {

    // Fetch our target
    // TODO: also fetch our prospects
    dispatch(updateScore(10)); 
    dispatch(requestTriad());

    let request = new Request('/api/pairs', {
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
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        dispatch(setScore(json.score));
        console.log(json);
        dispatch(receiveTriad(json));
      });
  };
}

export const GET_NEW_CANDIDATES = 'GET_NEW_CANDIDATES';

export function getNewCandidates() {
  return function(dispatch) {

    let request = new Request('/api/candidates', {
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
        dispatch(receiveTriad(json.candidates));
      });
  };
}

export const BUY_CANDIDATE = 'BUY_CANDIDATE';

export function buyCandidate(candidate, user, scoreChange) {
  console.log('got HERE to buyCandidate');
  return function(dispatch) {
    dispatch(updateScore(scoreChange));
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
export const RECEIVE_TRIAD = 'RECEIVE_TRIAD';

function receiveTriad(json) {
  return {
    type: RECEIVE_TRIAD,
    triad: json,
    isFetching: false,
    receivedAt: Date.now()
  };
}

