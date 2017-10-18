export const prefixModule = 'prefixModule'

import gridView from 'core/stores/sequencer/view/grid'

class TimelineVector {
  bar: number
  numerator: number
  denominator: number
  ticks: number

  get offsetX() {
    return this.bar * gridView.barWidth
  }

  constructor(bar = 1, numerator = 0, denominator = 0, ticks = 0) {
    this.bar = bar
    this.numerator = numerator
    this.denominator = denominator
    this.ticks = ticks
  }
}

export default TimelineVector
