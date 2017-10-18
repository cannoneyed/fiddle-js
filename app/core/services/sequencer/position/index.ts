import gridView from 'core/stores/sequencer/view/grid'
import TimelineVector from 'core/classes/timeline-vector'

class SequencerPositionService {
  getTimelineVector = (offsetX: number) => {
    const { barWidth } = gridView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new TimelineVector(nearestBar)
  }

  getOffsetX = (position: TimelineVector) => {
    return position.bar * gridView.barWidth
  }
}

export default new SequencerPositionService()
export { SequencerPositionService }
