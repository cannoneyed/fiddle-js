import { observable } from 'mobx'

import TimelineVector from 'core/models/timeline-vector'
import sequencerView from 'core/stores/sequencer/view'

class SequencerPositionStore {
  @observable snapPosition = new TimelineVector()

  getPositionFromOffset = (offsetX: number) => {
    const { barWidth } = sequencerView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new TimelineVector(nearestBar)
  }
}

export default new SequencerPositionStore()
export { SequencerPositionStore }
