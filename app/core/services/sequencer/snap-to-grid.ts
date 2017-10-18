import gridView from 'core/stores/sequencer/view/grid'
// import sequencerState from 'core/stores/sequencer/state'
import TimelineVector from 'core/models/timeline-vector'

// const MIN_WIDTH = 4

class SnapToGridService {
  getNearestSnapPosition = (offsetX: number) => {
    // const snapToGrid = sequencerState.snapToGrid

    // First, decide the correct division by which to attempt a snap
    const { barWidth } = gridView
    // const divisions = snapToGrid.divisions
    // const divisionWidth = snapToGrid.getDivisionWidth(barWidth)

    const precedingBar = Math.floor(offsetX / barWidth)
    return new TimelineVector(precedingBar)
  }
}

export default new SnapToGridService()
export { SnapToGridService }
