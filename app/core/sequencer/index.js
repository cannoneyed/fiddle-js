import { combineReducers } from 'redux-immutable'
import state from './state'
import view from './view'

const rootReducer = combineReducers({
  state,
  view,
})

export default rootReducer
