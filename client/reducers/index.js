import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import matchmaker from './matchmaker';
import scoreboard from './scoreboard';
import user from './user';
import multiplayer from './multiplayer';
import {reducer as formReducer} from 'redux-form';
import chats from './chats';
import recommendation from './recommendation';
import landing from './landing';

const rootReducer = combineReducers({
  routing: routeReducer,
  form: formReducer,
  scoreboard,
  matchmaker,
  user,
  chats,
  recommendation,
  multiplayer,
  landing
});

export default rootReducer;
