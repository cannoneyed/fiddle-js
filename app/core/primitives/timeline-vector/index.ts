import { Fraction } from 'core/primitives/fraction';
import { json } from 'core/serialization/json';

export class TimelineVector {
  @json bar: number;
  @json beats: Fraction;
  @json ticks: number;

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

  isLessThan(other: TimelineVector) {
    if (this.bar < other.bar) return true;
    else if (this.bar === other.bar) {
      if (this.beats.isLessThan(other.beats)) return true;
      else if (this.beats.isEqualTo(other.beats)) {
        if (this.ticks < other.ticks) return true;
      }
    }
    return false;
  }

  isGreaterThan(other: TimelineVector) {
    if (this.bar > other.bar) return true;
    else if (this.bar === other.bar) {
      if (this.beats.isGreaterThan(other.beats)) return true;
      else if (this.beats.isEqualTo(other.beats)) {
        if (this.ticks > other.ticks) return true;
      }
    }
    return false;
  }

  isEqualTo(other: TimelineVector) {
    return (
      this.bar === other.bar && this.beats.isEqualTo(other.beats) && this.ticks === other.ticks
    );
  }

  static clamp(position: TimelineVector, min: TimelineVector, max: TimelineVector) {
    if (position.isLessThan(min)) return min;
    if (position.isGreaterThan(max)) return max;
    return position;
  }

  static sortAscending(timelineVectors: TimelineVector[]) {
    return timelineVectors.sort((a, b) => {
      if (a.isLessThan(b)) {
        return -1;
      } else if (a.isGreaterThan(b)) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
