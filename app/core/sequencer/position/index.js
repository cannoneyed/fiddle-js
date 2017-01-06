import { observable } from 'mobx'

import sequencerView from 'core/sequencer/view'

class Position {
  bar
  beatNumerator
  beatDenominator

  constructor() {
    this.bar = 1
    this.beatNumerator = 0
    this.beatDenominator = 4
  }
}

class SequencerPosition {
  @observable snapPosition = new Position()

  getPositionFromOffset = (offsetX) => {
    const { barWidth } = sequencerView
    const nearestBar = Math.floor(offsetX / barWidth)
    return nearestBar * barWidth
  }
}

export default new SequencerPosition()
export { SequencerPosition, Position }
