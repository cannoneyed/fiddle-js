import sequencerState from 'core/stores/sequencer/state'
import sequencerView from 'core/stores/sequencer/view'

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

export default Position
