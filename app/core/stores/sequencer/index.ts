import position from './position'
import state from './state'
import view from './view'

class SequencerStore {
  position = position
  state = state
  view = view
}

export default new SequencerStore()
export { SequencerStore }
