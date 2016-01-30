import merge from 'lodash/object/merge'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import matchmaker from './matchmaker'
import scoreboard from './scoreboard'
<<<<<<< HEAD
import user from './user'
=======
import authentication from './authentication'
>>>>>>> Lots of changes to have button to login in and add and get user data from the database

const rootReducer = combineReducers({
  routing: routeReducer,
  scoreboard,
  matchmaker,
  user,
  authentication
})

export default rootReducer
