import * as ChatsActions from '../actions/chats';

// FB.getLoginStatus()
const initialState = {
  chats: {},
  focus: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ChatsActions.SET_CHATS:
      return Object.assign({}, state, {
        chats: action.chats
      });

    case ChatsActions.EXPAND_CHAT:
      return Object.assign({}, state, {
        focus: action.pair_id
      });

    case ChatsActions.HEART_CONNECTION_CHANGING:
      let noteableChat = Object.assign({}, state.chats[action.pair_id], {
        heartChanging: true
      });
      let heartConnectionChangingState = Object.assign({}, state);
      heartConnectionChangingState.chats[action.pair_id] = noteableChat;
      return heartConnectionChangingState;

    case ChatsActions.HEART_CONNECTION_CHANGED:
      let particularChat = Object.assign({}, state.chats[action.pair_id], {
        userHeart: action.userHeart,
        pairHeart: action.pairHeart,
        heartChanging: false
      });
      let newState = Object.assign({}, state);
      newState.chats[action.pair_id] = particularChat;
      return newState;

    case ChatsActions.REMOVE_CHAT:
      let chats = Object.assign({}, newState.chats);
      delete chats[action.pair_id];
      newState.chats = chats;
      newState.focus = null;
      return newState;

    case ChatsActions.COLLAPSE_CHAT:
      return Object.assign({}, state, {
        focus: null
      });

    default:
      return state;
  }
};

