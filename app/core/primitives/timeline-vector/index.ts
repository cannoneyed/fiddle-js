import { Fraction } from 'core/primitives/fraction';
import { divideIntWithRemainder } from 'utils/math';

const TICKS_PER_16 = 480;
const defaultBeats = () => new Fraction(0, 4);
const defaultTimeSignature = () => new Fraction(4, 4);

export class TimelineVector {
  readonly absoluteTicks: number;
  readonly bar: number;
  readonly beats: Fraction;
  readonly ticks: number;

  constructor(
    bar = 0,
    beats = defaultBeats(),
    ticks = 0,
    public readonly timeSignature = defaultTimeSignature()
  ) {
    const ticksPerBar = (16 / timeSignature.denominator) * timeSignature.numerator * TICKS_PER_16;
    const absoluteTicks = bar * ticksPerBar + beats.multiplyScalar(ticksPerBar) + ticks;

    this.absoluteTicks = absoluteTicks;

    this.bar = bar;
    const { fraction, number } = beats.reduce().mixedNumber();

    this.bar += number;
    this.beats = fraction;
    this.ticks = ticks;
  }

  makeNegative() {
    const bar = this.bar * -1;
    const beats = this.beats.multiply(-1, 1);
    const ticks = this.ticks * -1;
    return new TimelineVector(bar, beats, ticks, this.timeSignature);
  }

  add(delta: TimelineVector) {
    const sum = this.absoluteTicks + delta.absoluteTicks;
    return TimelineVector.fromAbsoluteTicks(sum, this.timeSignature);
  }

  subtract(delta: TimelineVector) {
    return this.add(delta.makeNegative());
  }

  lt(other: TimelineVector) {
    return this.absoluteTicks < other.absoluteTicks;
  }

  gt(other: TimelineVector) {
    return this.absoluteTicks > other.absoluteTicks;
  }

  lte(other: TimelineVector) {
    return this.absoluteTicks <= other.absoluteTicks;
  }

  gte(other: TimelineVector) {
    return this.absoluteTicks >= other.absoluteTicks;
  }

  equals(other: TimelineVector) {
    return this.absoluteTicks === other.absoluteTicks;
  }

  copy() {
    return new TimelineVector(this.bar, this.beats, this.ticks, this.timeSignature);
  }

  static clamp(position: TimelineVector, min: TimelineVector, max: TimelineVector) {
    if (position.lt(min)) return min;
    if (position.gt(max)) return max;
    return position;
  }

  static isBetween(position: TimelineVector, a: TimelineVector, b: TimelineVector): boolean {
    const aLessThanB = a.absoluteTicks < b.absoluteTicks;
    const start = aLessThanB ? a.absoluteTicks : b.absoluteTicks;
    const end = aLessThanB ? b.absoluteTicks : a.absoluteTicks;
    return position.absoluteTicks > start && position.absoluteTicks < end;
  }

  static isBetweenInclusive(
    position: TimelineVector,
    a: TimelineVector,
    b: TimelineVector
  ): boolean {
    const aLessThanB = a.absoluteTicks < b.absoluteTicks;
    const start = aLessThanB ? a.absoluteTicks : b.absoluteTicks;
    const end = aLessThanB ? b.absoluteTicks : a.absoluteTicks;
    return position.absoluteTicks >= start && position.absoluteTicks <= end;
  }

  static sortAscendingFn(a: TimelineVector, b: TimelineVector) {
    if (a.lt(b)) {
      return -1;
    } else if (a.gt(b)) {
      return 1;
    } else {
      return 0;
    }
  }

  static sortAscending(timelineVectors: TimelineVector[]) {
    return timelineVectors.sort(TimelineVector.sortAscendingFn);
  }

  static fromAbsoluteTicks(absoluteTicks: number, timeSignature = defaultTimeSignature()) {
    const { int: sixteenths, remainder: ticks } = divideIntWithRemainder(
      absoluteTicks,
      TICKS_PER_16
    );

    const bars = Math.floor(sixteenths / 16);
    const remainderSixteenths = sixteenths - bars * 16;
    const beats = new Fraction(remainderSixteenths, 16);

    return new TimelineVector(bars, beats, ticks, timeSignature);
  }

  static getNDivisions(timelineVector: TimelineVector, division: Fraction) {
    const sixteenth = new Fraction(1, 16);
    const ticksPerDivision = division.divide(sixteenth).multiplyScalar(TICKS_PER_16);
    return Math.floor(timelineVector.absoluteTicks / ticksPerDivision);
  }
}
