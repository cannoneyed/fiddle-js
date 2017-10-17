import GridView from './grid'
import TracksView from './tracks'
import Zoom from './zoom'

class SequencerViewStore {
  grid = GridView
  tracks = TracksView
  zoom = Zoom
}

export default new SequencerViewStore()
export { SequencerViewStore }
