import dom from './dom'
import layout from './layout'
import state from './state'
import view from './view'

class SequencerStore {
  dom = dom
  layout = layout
  state = state
  view = view
}

export default new SequencerStore()
export { SequencerStore }
