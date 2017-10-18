import gridView from 'core/stores/sequencer/view/grid'
// import sequencerState from 'core/stores/sequencer/state'
import TimelineVector from 'core/models/timeline-vector'

class SnapToGridService {
  getNearestSnapPosition = (offsetX: number) => {
    // const snapToGrid = sequencerState.snapToGrid
    const { barWidth } = gridView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new TimelineVector(nearestBar)
  }
}

export default new SnapToGridService()
export { SnapToGridService }
