import GridView from './grid'
import TimelineView from './timeline'
import TracksView from './tracks'
import Zoom from './zoom'

class SequencerViewStore {
  grid = GridView
  timeline = TimelineView
  tracks = TracksView
  zoom = Zoom
}

export default new SequencerViewStore()
export { SequencerViewStore }
