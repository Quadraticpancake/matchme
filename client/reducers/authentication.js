import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/authentication'



const initialState = {
  isFetchingAuth: true,
  user: null
}


export default function authentication(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
              isFetchingAuth: true
            })
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
			  isFetchingAuth: false,
			  user: action.user
			})
		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
			  user: null
			})
		/*
		case LOGIN_FAILURE: 
			return Object.assign({}, state {
			  isFetchingAuth: false
			})
        */
		// This case may be implemented lazily for now because FB may not successfully log out

	}
	return state
}