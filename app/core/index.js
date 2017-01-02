import { combineReducers } from 'redux-immutable'
import data from './data'
import routing from './routing'
import sequencer from './sequencer'
import tracks from './tracks'

const rootReducer = combineReducers({
  data,
  routing,
  sequencer,
  tracks,
})

export default rootReducer
