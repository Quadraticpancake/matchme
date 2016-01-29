import fetch from 'isomorphic-fetch'

///////////////////
// User actions
///////////////////

export const CHOOSE_MATCH = 'CHOOSE_MATCH'

export function chooseMatch(target, prospect) {
  console.log('chooseMatch called')
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.
  return function (dispatch) {

    // Fetch our target
    // TODO: also fetch our prospects
    let request = new Request('/api/pairs',  {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({matchmaker: {user_id: 3}, pair: {target: {user_id: target.user_id}, prospect: {user_id: prospect.user_id} }})

    })

    // {method: 'POST', body: JSON.stringify({target: {user_id: 1}, prospect: {user_id: 2}}) })
    console.log(request)
    return fetch(request)
      .then(response => response.json())
      .then((json) => {
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.
        console.log(json);
        dispatch(receiveTriad(json))
      }

      )

    // TODO:
    // .then(dispatch(fetchProspects))

  }
}


///////////////////
// Network requests
///////////////////


// TARGET

export const REQUEST_TRIAD = 'REQUEST_TRIAD'
function requestTarget() {
  return {
    type: REQUEST_TARGET
  }
}
export const RECEIVE_TRIAD = 'RECEIVE_TRIAD'

function receiveTriad(json) {

  // Unpack more here

  // let target = json.pop();

  // let prospects = json;

  return {
    type: RECEIVE_TRIAD,
    triad: json,
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
    dispatch(requestTriad())

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


