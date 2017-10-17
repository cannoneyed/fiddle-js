import gridView from 'core/stores/sequencer/view/grid'
import TimelineVector from 'core/models/timeline-vector'

export const getTimelineVectorFromOffset = (offsetX: number) => {
  const { barWidth } = gridView
  const nearestBar = Math.floor(offsetX / barWidth)
  return new TimelineVector(nearestBar)
}
