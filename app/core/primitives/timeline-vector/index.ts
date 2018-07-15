import { Fraction } from 'core/primitives/fraction';
import { divideIntWithRemainder } from 'utils/math';

const TICKS_PER_16 = 480;
const defaultBeats = () => new Fraction(0, 4);
const defaultTimeSignature = () => new Fraction(4, 4);

export class TimelineVector {
  readonly absoluteTicks: number;

  constructor(
    public readonly bar = 0,
    public readonly beats = defaultBeats(),
    public readonly ticks = 0,
    public readonly timeSignature = defaultTimeSignature()
  ) {
    const sixteenthsPerBar =
      (16 / timeSignature.denominator) * timeSignature.numerator * TICKS_PER_16;
    const absoluteTicks = bar * sixteenthsPerBar + beats.multiplyScalar(sixteenthsPerBar) + ticks;
    this.absoluteTicks = absoluteTicks;
  }

  makeNegative() {
    const bar = this.bar * -1;
    const beats = this.beats.multiply(-1, 1);
    const ticks = this.ticks * -1;
    return new TimelineVector(bar, beats, ticks, this.timeSignature);
  }

  add(delta: TimelineVector) {
    const sumTicks = this.ticks + delta.ticks;
    const { int: nextTicks, remainder: remainderBeats } = divideIntWithRemainder(
      sumTicks,
      TICKS_PER_16
    );
    const remainderSixteenths = new Fraction(remainderBeats, 16);

    const sumBeats = this.beats.add(delta.beats).add(remainderSixteenths);
    const { number: remainderBars, fraction: beats } = sumBeats.mixedNumber();
    let bars = this.bar + delta.bar + remainderBars;

    return new TimelineVector(bars, beats, nextTicks, this.timeSignature);
  }

  subtract(delta: TimelineVector) {
    return this.add(delta.makeNegative());
  }

  isLessThan(other: TimelineVector) {
    return this.absoluteTicks < other.absoluteTicks;
  }

  isGreaterThan(other: TimelineVector) {
    return this.absoluteTicks > other.absoluteTicks;
  }

  isEqualTo(other: TimelineVector) {
    return this.absoluteTicks === other.absoluteTicks;
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

  // TODO: Make this work with remainders
  getNDivisions(division: Fraction) {
    const sixteenth = new Fraction(1, 16);
    const ticksPerDivision = division.divide(sixteenth).multiplyScalar(TICKS_PER_16);
    return Math.floor(this.absoluteTicks / ticksPerDivision);
  }
}
