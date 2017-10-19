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

  add(delta: TimelineVector) {
    let bars = this.bar + delta.bar
    const { number, fraction: beats } = this.beats.add(delta.beats).mixedNumber()
    bars += number

    // TODO: Refactor once ticks system is sorted
    this.ticks += delta.ticks
    return new TimelineVector(bars, beats)
  }

  subtract(delta: TimelineVector) {
    let bars = this.bar - delta.bar
    const { number, fraction: beats } = this.beats.add(delta.beats).mixedNumber()
    bars -= number

    // TODO: Refactor once ticks system is sorted
    this.ticks -= delta.ticks
    return new TimelineVector(bars, beats)
  }
}

export default TimelineVector
