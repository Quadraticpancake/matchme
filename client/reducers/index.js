import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import matchmaker from './matchmaker';
import scoreboard from './scoreboard';
import user from './user';
import {reducer as formReducer} from 'redux-form';
import chats from './chats';

const rootReducer = combineReducers({
  routing: routeReducer,
  form: formReducer,
  scoreboard,
  matchmaker,
  user,
  chats
});

export default rootReducer;
