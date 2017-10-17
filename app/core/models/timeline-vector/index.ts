import sequencerState from 'core/stores/sequencer/state'
import sequencerView from 'core/stores/sequencer/view'

class TimelineVector {
  bar: number
  beatNumerator: number
  beatDenominator: number

  get bars() {
    return this.bar + this.beatNumerator / this.beatDenominator * 1
  }

  get offsetX() {
    return this.bar * sequencerView.grid.barWidth
  }

  constructor(bar = 0, beatNumerator = 4, beatDenominator = 4) {
    beatDenominator = sequencerState.timeSignature.denominator

    this.bar = bar
    this.beatNumerator = beatNumerator
    this.beatDenominator = beatDenominator
  }
}

export default TimelineVector
