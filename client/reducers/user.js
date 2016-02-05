import { SET_USER_SCORE, SET_USER_INFO, UPDATE_USER_INFO} from '../actions/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/authentication';
import { GET_ALBUM, RECEIVE_ALBUM } from '../actions/pictureActions.js';

// FB.getLoginStatus()
const initialState = {
  user_id: null,
  userScore: {score: null, pairs: []},
  album: {}

};

export default function user(state = initialState, action) {

  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingAuth: true,
        isAuthenticated: false,
      });
    case LOGIN_SUCCESS:
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
    case SET_USER_SCORE:
      return Object.assign({}, state, {
        userScore: action.userScore
      });
    case SET_USER_INFO:
      return {
        ...state,
        isSettingUserInfo: true,
        userInfo: {...state.userInfo, ...action.userInfo}
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        isSettingUserInfo: false,
        userInfo: {...state.userInfo, ...action.userInfo}
      };
    case GET_ALBUM:
      return {
        ...state,
        isFetchingAlbum: true,
      }
    case RECEIVE_ALBUM:
      return {
        ...state,
        isFetchingAlbum: false,
        album: {...state.album, ...action.album}
      }
    default:
      return state;
  }
}
