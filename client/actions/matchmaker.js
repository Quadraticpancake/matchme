import fetch from 'isomorphic-fetch';


// Function creates closure for the mostRecent click to add rate limiter to actions
var createClickTracker = function (miliseconds) {
  var lastClick = 0;
  return function () {
    if ((Date.now() - lastClick) > miliseconds) {
      lastClick = Date.now();
      return true;
    }
    return false;
  }
}

// Rate limits matchChoosing to no more than 1 per second
var matchClickTracker = createClickTracker(1000);

export const CHOOSE_MATCH = 'CHOOSE_MATCH';

// Choose match updates score, gets new candidates and posts the match to the server.
export function chooseMatch(target, prospect, user_id, triads) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch) {
    if (matchClickTracker()) {
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
            // returns a bonus 
            dispatch(updateScore(json.score));
          }                    
        });
    }
  } 
}

export const GET_NEW_CANDIDATES = 'GET_NEW_CANDIDATES';

// Function requests a set of new candidates
export function getNewCandidates(user_id, triads) {
  user_id = user_id || 0;
  return function(dispatch) {
    dispatch(requestTriad())
    // triads array version of the app
    //if (triads.length < 3 && triadTracker()) {
      let request = new Request('/api/users/' + user_id + '/candidates', {
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

// Function buys a target and gets new candidates
export function buyCandidate(candidate, user, scoreChange, triads) {
  return function(dispatch) {
    dispatch(buyRecommendation(candidate, user, scoreChange));
    dispatch(getNewCandidates(user, triads));
  }
}

export const BUY_RECOMMENDATION = 'BUY_RECOMMENDATION';

// Function buys (via put) the candidate for the user and updates score according to score change
export function buyRecommendation(candidate, user, scoreChange) {
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

// increase/decrease score by scorechange in state
function updateScore(scoreChange) {
  return {
    type: UPDATE_SCORE,
    scoreChange: scoreChange
  };
}

export const SET_SCORE = 'SET_SCORE';

// Set score to the score value
function setScore(score) {
  return {
    type: SET_SCORE,
    score: score
  };
}

export const REQUEST_TRIAD = 'REQUEST_TRIAD';

// Tells the state that the app is requesting a new triad
function requestTriad() {
  return {
    type: REQUEST_TRIAD,
    isFetching: true
  };
}

export const RECEIVE_TRIADS = 'RECEIVE_TRIADS';

// updates the state to have the new triad and not that the fetching is complete
function receiveTriads(json) {
  return {
    type: RECEIVE_TRIADS,
    triads: json,
    isFetching: false,
    receivedAt: Date.now()
  };
}

