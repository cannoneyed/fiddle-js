import gridView from 'core/stores/sequencer/view/grid'
// import sequencerState from 'core/stores/sequencer/state'
import TimelineVector from 'core/classes/timeline-vector'

// const MIN_WIDTH = 4

class SnapToGridService {
  getNearestSnapPosition = (offsetX: number) => {
    // const snapToGrid = sequencerState.snapToGrid

    // First, decide the correct division by which to attempt a snap
    const { barWidth } = gridView
    // const divisions = snapToGrid.divisions
    // const divisionWidth = snapToGrid.getDivisionWidth(barWidth)

    const prevBar = Math.floor(offsetX / barWidth)
    const nextBar = prevBar + 1

    const prevDifference = offsetX - prevBar * barWidth
    const nextDifference = nextBar * barWidth - offsetX
    const closestBar = nextDifference > prevDifference ? prevBar : nextBar

    return new TimelineVector(closestBar)
  }
}

export default new SnapToGridService()
export { SnapToGridService }
