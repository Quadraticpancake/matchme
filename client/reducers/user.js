import { SET_USER_SCORE, SET_USER_INFO, UPDATE_USER_INFO, CHANGE_INDEX} from '../actions/user';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_REQUEST } from '../actions/authentication';
import { GET_ALBUM, RECEIVE_ALBUM } from '../actions/pictureActions.js';
import { SET_SCORE, UPDATE_SCORE} from '../actions/matchmaker';


// FB.getLoginStatus()
const initialState = {
  user_id: null,
  userScore: {score: null, pairs: [], index: 0},
  album: {}

};

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
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
      newState.userScore = Object.assign({}, newState.userScore, action.userScore);
      return newState;
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

    case SET_SCORE:
      newState.userScore.score = action.score;
      return newState;

    case UPDATE_SCORE:
      newState.userScore.score += action.scoreChange;
      return newState;

    case CHANGE_INDEX:
      newState.userScore.index += action.indexChange;
      if (newState.userScore.index === -1) {
        newState.userScore.index += 1;
      } else if (newState.userScore.index === newState.userScore.pairs.length) {
        newState.userScore.index -= 1;
      }
      return newState;

    default:
      return state;
  }
}
