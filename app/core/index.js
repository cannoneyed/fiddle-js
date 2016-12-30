import { combineReducers } from 'redux-immutable'
import routing from './routing'
import counter from './counter'

const rootReducer = combineReducers({
  counter,
  routing,
})

export default rootReducer
