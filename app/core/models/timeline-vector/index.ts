import { clamp } from 'lodash'
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
    this.bar = clamp(bar, 0, Infinity)
    this.numerator = clamp(numerator, 0, Infinity)
    this.denominator = clamp(denominator, 0, Infinity)
    this.ticks = clamp(ticks, 0, Infinity)
  }
}

export default TimelineVector
