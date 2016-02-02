import * as ChatsActions from '../actions/chats';


// FB.getLoginStatus()
const initialState = {
  chats: {},
  focus: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case ChatsActions.SET_CHATS:
      return Object.assign({}, state, {
        chats: action.chats
      });
    case ChatsActions.EXPAND_CHAT:
      return Object.assign({}, state, {
        focus: 0
      });

    default:
      return state;
  }
}
