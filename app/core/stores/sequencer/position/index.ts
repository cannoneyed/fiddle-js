import { observable } from 'mobx'

import Position from 'core/models/position'
import sequencerView from 'core/stores/sequencer/view'

class SequencerPositionStore {
  @observable snapPosition = new Position()

  getPositionFromOffset = (offsetX: number) => {
    const { barWidth } = sequencerView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new Position(nearestBar)
  }
}

export default new SequencerPositionStore()
export { SequencerPositionStore }
