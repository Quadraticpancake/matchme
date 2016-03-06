import fetch from 'isomorphic-fetch';

/////////////////////////////
// recommendation actions //
////////////////////////////

export const POST_REC = 'POST_REC';

export const postRecommendation = (user_id, user_gender, user_preference) => {
  return (dispatch) => {
    dispatch(requestRecommendation());

    const request = new Request(`/api/users/${user_id}/recommendation`, {
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
        dispatch(receiveRecommendation(json));
      });
  };
};


///////////////////
// Network requests
///////////////////

export const REQUEST_REC = 'REQUEST_REC';
const requestRecommendation = () => {
  console.log('requestRecommendation');
  return {
    type: REQUEST_REC,
  };
};

export const RECEIVE_REC = 'RECEIVE_REC';
const receiveRecommendation = (json) => {
  return {
    type: RECEIVE_REC,
    recommendation: json,
    receivedAt: Date.now()
  };
};

