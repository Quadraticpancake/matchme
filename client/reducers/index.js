import * as ActionTypes from '../actions'
import merge from 'lodash/object/merge'
import { routerStateReducer as router } from 'redux-router'
import { combineReducers } from 'redux'
import matchmaker from './matchmaker'

const rootReducer = combineReducers({
  matchmaker
})

export default rootReducer
