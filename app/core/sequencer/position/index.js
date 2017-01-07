import { observable } from 'mobx'

import sequencerView from 'core/sequencer/view'
import sequencerState from 'core/sequencer/state'

class Position {
  bar
  beatNumerator
  beatDenominator

  get bars() {
    return this.bar + (this.beatNumerator / this.beatDenominator) * 1
  }

  get offsetX() {
    return this.bars * sequencerView.barWidth
  }

  constructor(bar = 1, beatNumerator = 0, beatDenominator) {
    beatDenominator = sequencerState.timeSignature.denominator

    this.bar = bar
    this.beatNumerator = beatNumerator
    this.beatDenominator = beatDenominator
  }
}

class SequencerPosition {
  @observable snapPosition = new Position()

  getPositionFromOffset = (offsetX) => {
    const { barWidth } = sequencerView
    const nearestBar = Math.floor(offsetX / barWidth)
    return new Position(nearestBar)
  }
}

export default new SequencerPosition()
export { SequencerPosition, Position }
