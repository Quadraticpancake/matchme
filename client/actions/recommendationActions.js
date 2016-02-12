import fetch from 'isomorphic-fetch';

/////////////////////////////
// recommendation actions //
////////////////////////////

export const POST_REC = 'POST_REC';

export function postRecommendation(user_id, user_gender, user_preference) {
  console.log('getting recommendation from recommendationActions!', user_id, user_gender, user_preference);
  
  return function(dispatch) {
    dispatch(requestRecommendation());

    let request = new Request(`/api/users/${user_id}/recommendation`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ gender: user_gender, preference: user_preference })
      });

    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        console.log('response from getting recommendation', json)
        dispatch(receiveRecommendation(json));
      });
  };
}


///////////////////
// Network requests
///////////////////


export const REQUEST_REC = 'REQUEST_REC';
function requestRecommendation() {
  console.log("requestRecommendation");
  return {
    type: REQUEST_REC,
  };
}

export const RECEIVE_REC = 'RECEIVE_REC';
function receiveRecommendation(json) {
  return {
    type: RECEIVE_REC,
    recommendation: json,
    receivedAt: Date.now()
  };
}


