import { combineReducers } from 'redux-immutable'
import routing from './routing'
import tracks from './tracks'

const rootReducer = combineReducers({
  routing,
  tracks,
})

export default rootReducer
