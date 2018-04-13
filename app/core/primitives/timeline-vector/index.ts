import { Fraction } from 'core/primitives/fraction';

export class TimelineVector {
  bar: number;
  beats: Fraction;
  ticks: number;

  constructor(bar = 0, beats?: Fraction, ticks = 0) {
    this.bar = bar;
    this.beats = beats === undefined ? new Fraction(0, 4) : beats;
    this.ticks = ticks;
  }

  makeNegative() {
    const bar = this.bar * -1;
    const beats = this.beats.multiply(-1, 1);
    const ticks = this.ticks * -1;
    return new TimelineVector(bar, beats, ticks);
  }

  add(delta: TimelineVector) {
    let bars = this.bar + delta.bar;
    const { number, fraction: beats } = this.beats.add(delta.beats).mixedNumber();
    bars += number;

    // TODO: Refactor once ticks system is sorted
    this.ticks += delta.ticks;
    return new TimelineVector(bars, beats);
  }

  subtract(delta: TimelineVector) {
    return this.add(delta.makeNegative());
  }
}
