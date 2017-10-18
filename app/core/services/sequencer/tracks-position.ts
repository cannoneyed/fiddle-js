import tracksView from 'core/stores/sequencer/view/tracks'
import sequencerLayout from 'core/stores/sequencer/layout'

class TracksPositionService {
  getOffsetXFromScreenX = (screenX: number) => {
    const leftEdge = sequencerLayout.tracksAreaLeft
    const scrolledX = tracksView.tracksScrolledX

    const offsetX = screenX - leftEdge + scrolledX
    return offsetX
  }
}

export default new TracksPositionService()
export { TracksPositionService }
