import fetch from 'isomorphic-fetch';
import { fetchChats } from './chats';
import { fetchUserScore } from './user';
import { routeActions } from 'react-router-redux';
import { getAlbum } from './pictureActions.js';
import { postRecommendation } from './recommendationActions.js';
import { socket } from '../containers/App';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export const login = (userID, accessToken) => {
  return (dispatch) => {
    dispatch(requestLogin());
    let request = new Request(`/api/users/${userID}`, { method: 'GET' });
    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        if (json) {
          // dispatch(postRecommendation(json.user_id, json.gender, json.gender_preference));
          dispatch(fetchChats(json.user_id));
          dispatch(fetchUserScore(json.user_id));
          dispatch(receiveLogin(json));
          dispatch(getAlbum(json.user_id));
        }
        // else {
        //   let request = new Request('/api/users', {
        //     method: 'post',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       facebook_id: userID,
        //       access_token: accessToken
        //     })
        //   });
        //   return fetch(request)
        //     .then(response => response.json())
        //     .then((json) => {
        //     // We can dispatch many times!
        //     // Here, we update the app state with the results of the API call.
        //       if (json) {
        //         // dispatch(postRecommendation(json.user_id, json.gender, json.gender_preference));
        //         dispatch(receiveLogin(json));
        //         dispatch(routeActions.push('/profile'));
        //         dispatch(fetchChats(json.user_id));
        //         dispatch(fetchUserScore(json.user_id));
        //         dispatch(getAlbum(json.user_id));
        //       }
        //     });
        // }
      });
  };

};

export const logout = () => {
  return (dispatch) => {
    dispatch(requestLogout());
    FB.logout( response => {
      console.log(response);
    });
  };
};

export const clickLogin = () => {
  return (dispatch) => {

    dispatch(requestLogin());
    FB.login(responseLogin => {
      let request2 = new Request(`/api/users/${responseLogin.authResponse.userID}`, { method: 'GET' });
      return fetch(request2)
        .then(response => response.json())
        .then((json) => {
          if (json) {
            // dispatch(postRecommendation(json.user_id, json.gender, json.gender_preference));
            dispatch(fetchChats(json.user_id));
            dispatch(fetchUserScore(json.user_id));
            dispatch(receiveLogin(json));
            dispatch(getAlbum(json.user_id));
          } else {
            // New User
            let request3 = new Request('/api/users', {
              method: 'post',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                facebook_id: responseLogin.authResponse.userID,
                access_token: responseLogin.authResponse.accessToken
              })
            });

            return fetch(request3)
              .then(response => response.json())
              .then((json) => {
              // We can dispatch many times!
              // Here, we update the app state with the results of the API call.
                // dispatch(postRecommendation(json.user_id, json.gender, json.gender_preference));
                dispatch(fetchChats(json.user_id));
                dispatch(fetchUserScore(json.user_id));
                dispatch(getAlbum(json.user_id));
                dispatch(receiveLogin(json));
                dispatch(routeActions.push('/profile'));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
    }, { scope: 'public_profile,email' });
  };
};

export const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
    isFetchingAuth: true
  };
}

export const receiveLogin = (user) => {
  socket.emit('joinGame', { newPlayer: user.user_id });
  return {
    type: LOGIN_SUCCESS,
    isFetchingAuth: false,
    user
  };
};

export const loginError = (message) => {
  return {
    type: LOGIN_FAILURE,
    isFetchingAuth: false,
    message
  };
};

export const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};