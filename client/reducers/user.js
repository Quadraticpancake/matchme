import * as UserActions from '../actions/user'

var initialState = {
	user_id: 0,
	chats: [{chat_id: 0, chatter1: 'amy', chatter2: 'bob', messages: ['hi']}]
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