import { clamp } from 'lodash'

import Fraction from 'core/classes/fraction'

class TimelineVector {
  bar: number
  beats: Fraction
  ticks: number

  constructor(bar = 1, beats?: Fraction, ticks = 0) {
    this.bar = clamp(bar, 0, Infinity)
    this.beats = beats === undefined ? new Fraction(0, 4) : beats
    this.ticks = clamp(ticks, 0, Infinity)
  }
}

export default TimelineVector
