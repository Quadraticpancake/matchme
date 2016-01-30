import * as UserActions from '../actions/user'

var initialState = {
	user_id: 20,
	chats: []
};

export default function user(state = initialState, action) {
	switch (action.type) {
		case UserActions.SET_CHATS:
			return Object.assign({}, state, {
				chats: action.chats
			})
	}
	return state
}