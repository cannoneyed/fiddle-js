import TimelineVector from 'core/classes/timeline-vector'

import gridView from 'core/stores/sequencer/view/grid'

class SequencerPositionService {
  getTimelineVector = (offsetX: number) => {
    const { barWidth } = gridView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new TimelineVector(nearestBar)
  }

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = gridView
    const bar = position.bar * barWidth
    const beats = position.beats.multiplyScalar(barWidth)

    return bar + beats
  }
}

export default new SequencerPositionService()
export { SequencerPositionService }
