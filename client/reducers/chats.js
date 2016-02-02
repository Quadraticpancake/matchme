import * as ChatsActions from '../actions/chats';


// FB.getLoginStatus()
const initialState = {
  chats: {}
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ChatsActions.SET_CHATS:
      return Object.assign({}, state, {
        chats: action.chats
      });
    case ChatsActions.SET_USER_SCORE:
      return Object.assign({}, state, {
        userScore: action.userScore
      });
    default:
      return state;
  }
}
