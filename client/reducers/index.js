import merge from 'lodash/object/merge'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import { combineReducers } from 'redux'
import matchmaker from './matchmaker'
import scoreboard from './scoreboard'
import user from './user'

const rootReducer = combineReducers({
  routing: routeReducer,
  scoreboard,
  matchmaker,
  user
})

export default rootReducer
