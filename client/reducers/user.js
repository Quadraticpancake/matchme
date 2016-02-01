import * as UserActions from '../actions/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/authentication';


// FB.getLoginStatus()
const initialState = {
  user_id: 20,
  userScore: null,
  chats: []
};

export default function user(state = initialState, action) {

  console.log(action.type);
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingAuth: true,
        isAuthenticated: false,
      });
    case LOGIN_SUCCESS:
      console.log('LOGIN SUCCESS');
      return Object.assign({}, state, {
        isFetchingAuth: false,
        userInfo: action.user,
        user_id: action.user.user_id,
        isAuthenticated: true
      });
    case LOGOUT_REQUEST:
      return Object.assign({}, state, {
        userInfo: null,
        user_id: null,
        isAuthenticated: false
      });
    case UserActions.SET_CHATS:
      return Object.assign({}, state, {
        chats: action.chats
      });
    case UserActions.SET_USER_SCORE:
      return Object.assign({}, state, {
        userScore: action.userScore
      });
    default:
      return state;
  }
}
