import * as UserActions from '../actions/user'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/authentication'

var initialState = {
	user_id: 20,
	chats: []
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return Object.assign({}, state, {
              isFetchingAuth: true
            })
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
			  isFetchingAuth: false,
			  userInfo: action.user,
			  user_id: action.user.user_id
			})
		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
			  userInfo: null,
			  user_id: null
			})
		case UserActions.SET_CHATS:
			return Object.assign({}, state, {
				chats: action.chats
			})
	}
	return state
}