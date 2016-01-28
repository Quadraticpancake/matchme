import fetch from 'isomorphic-fetch'

///////////////////
// User actions
///////////////////

export const CHOOSE_MATCH = 'CHOOSE_MATCH'
export function chooseMatch(index) {
  return { type: types.CHOOSE_MATCH, index }
}

export function chooseMatch() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // Fetch our target
    // TODO: also fetch our prospects
    dispatch(fetchTarget())

    // TODO:
    // .then(dispatch(fetchProspects)) 

  }
}


///////////////////
// Network requests
///////////////////


// TARGET

export const REQUEST_TARGET = 'REQUEST_TARGET'
function requestTarget() {
  return {
    type: REQUEST_TARGET
  }
}
export const RECEIVE_TARGET = 'RECEIVE_TARGET'

function receiveTarget(json) {

  // Unpack more here
  
  let target = {
    name: json[0].first_name
  }

  return {
    type: RECEIVE_TARGET,
    target: target,
    receivedAt: Date.now()
  }
}

export function fetchTarget() {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestTarget())
    console.log('1. in fetchTarget')

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    let request = new Request('/api/candidates', {method: 'GET'})
    return fetch(request)
      .then(response => response.json())
      .then(json =>

        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receiveTarget(json))
      )

      // In a real world app, you also want to
      // catch any error in the network call.
      // TODO: this.
  }
}

// PROSPECTS

