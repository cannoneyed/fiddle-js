import gridView from 'core/stores/sequencer/view/grid'
// import sequencerState from 'core/stores/sequencer/state'
import TimelineVector from 'core/classes/timeline-vector'

// const MIN_WIDTH = 4

class SnapToGridService {
  getNearestSnapPosition = (offsetX: number) => {
    // const snapToGrid = sequencerState.snapToGrid

    // First, decide the correct division by which to attempt a snap
    const { divisionWidth, division } = gridView
    // const divisions = snapToGrid.divisions
    // const divisionWidth = snapToGrid.getDivisionWidth(barWidth)

    const prevDivision = Math.floor(offsetX / divisionWidth)
    const nextDivision = prevDivision + 1

    const prevDifference = offsetX - prevDivision * divisionWidth
    const nextDifference = nextDivision * divisionWidth - offsetX
    const closestDivision = nextDifference > prevDifference ? prevDivision : nextDivision

    const position = division.multiply(closestDivision, 1)
    const bar = Math.floor(position.numerator / position.denominator)
    const beats = position.subtract(position.denominator * bar, position.denominator)

    return new TimelineVector(bar, beats)
  }
}

export default new SnapToGridService()
export { SnapToGridService }
