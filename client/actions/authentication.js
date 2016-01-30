import fetch from 'isomorphic-fetch'


export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'

// Working but not hooked up to redux totally properly

export function clickLogin () {
  console.log("CLICK LOGIN")
  requestLogin();
  FB.getLoginStatus(function(response) {
    console.log(response);
    // In this case the user must have logged in previously so get request SHOULD return user data
    // These puts should be converted to gets with ID params
    if (response === 'connected') {
      let request = new Request ('/api/users',  {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({facebook_id: response.authResponse.userID})
      })
      return fetch(request)
        .then(response => response.json())
        .then((json) => {
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          console.log(json);
          receiveLogin(json);
        })
    } else {
      FB.login(function (responseLogin) {
        console.log(responseLogin);
        console.log("Successful login:", responseLogin.authResponse.userID);
        let request2 = new Request ('/api/users',  {
          method: 'put',
           headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({facebook_id: responseLogin.authResponse.userID})
        })
        return fetch(request2)
          .then(response => response.json())
          .then((json) => {
            console.log(json);
            if (json) {
              receiveLogin(json)
            } else {
              let request3 = new Request ('/api/users',  {
                method: 'post',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  facebook_id: responseLogin.authResponse.userID, 
                  access_token: responseLogin.authResponse.accessToken
                })
              })
              return fetch(request3)
                .then(response => response.json())
                .then((json) => {
                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.
                  console.log(json);
                  receiveLogin(json)
                })
            }
          })
      }, {scope: 'public_profile,email'})
    }
  })    
}

clickLogin();

export function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetchingAuth: true
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetchingAuth: false,
    user: user
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetchingAuth: false
  }
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  }
}