import { Fraction } from 'core/primitives/fraction';
import { TimeSignature } from 'core/primitives/time-signature';
import { absFloor } from 'utils/math';

export const TICKS_PER_SECONDARY = 240;
const defaultTimeSignature = () => new TimeSignature(4, 4);

const computeSecondaryPerPrimary = (timeSignature: TimeSignature) => {
  return 12; // TODO: Figure out 6/8 time signatures
};

const computeDivisions = (absoluteTicks: number, timeSignature: TimeSignature) => {
  const secondaryPerPrimary = computeSecondaryPerPrimary(timeSignature);
  const primaryPerBar = timeSignature.numerator;
  const ticksPerPrimary = secondaryPerPrimary * TICKS_PER_SECONDARY;
  const ticksPerBar = ticksPerPrimary * primaryPerBar;

  let computedTicks = absoluteTicks;
  const bars = absFloor(computedTicks / ticksPerBar);
  computedTicks -= bars * ticksPerBar;
  const primary = absFloor(computedTicks / ticksPerPrimary);
  computedTicks -= primary * ticksPerPrimary;
  const secondary = absFloor(computedTicks / TICKS_PER_SECONDARY);
  computedTicks -= secondary * TICKS_PER_SECONDARY;
  const ticks = computedTicks;

  return { bars, primary, secondary, ticks };
};

export class TimelineVector {
  readonly absoluteTicks: number;
  readonly bars: number;
  readonly primary: number;
  readonly secondary: number;
  readonly ticks: number;

  constructor(
    bars = 0,
    primary = 0,
    secondary = 0,
    ticks = 0,
    public readonly timeSignature = defaultTimeSignature()
  ) {
    const secondaryPerPrimary = computeSecondaryPerPrimary(timeSignature);
    const primaryPerBar = timeSignature.numerator;

    const ticksPerPrimary = secondaryPerPrimary * TICKS_PER_SECONDARY;
    const ticksPerBar = ticksPerPrimary * primaryPerBar;

    const absoluteTicks =
      bars * ticksPerBar + primary * ticksPerPrimary + secondary * TICKS_PER_SECONDARY + ticks;
    this.absoluteTicks = absoluteTicks;

    const computed = computeDivisions(absoluteTicks, timeSignature);
    this.bars = computed.bars;
    this.primary = computed.primary;
    this.secondary = computed.secondary;
    this.ticks = computed.ticks;
  }

  getFractionAfterBar() {
    const secondaryPerPrimary = computeSecondaryPerPrimary(this.timeSignature);
    const primaryPerBar = this.timeSignature.numerator;
    const ticksPerPrimary = secondaryPerPrimary * TICKS_PER_SECONDARY;
    const ticksPerBar = ticksPerPrimary * primaryPerBar;

    const primary = new Fraction(this.primary, primaryPerBar);
    const secondary = new Fraction(this.secondary, secondaryPerPrimary * primaryPerBar);
    const ticks = new Fraction(this.ticks, ticksPerBar);

    return primary.add(secondary).add(ticks);
  }

  makeNegative() {
    const { bars, primary, secondary, ticks, timeSignature } = this;
    return new TimelineVector(-bars, -primary, -secondary, -ticks, timeSignature);
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
    return new TimelineVector(
      this.bars,
      this.primary,
      this.secondary,
      this.ticks,
      this.timeSignature
    );
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
    const { bars, primary, secondary, ticks } = computeDivisions(absoluteTicks, timeSignature);
    return new TimelineVector(bars, primary, secondary, ticks, timeSignature);
  }

  static fromFraction(fraction: Fraction, timeSignature = defaultTimeSignature()) {
    const secondaryPerPrimary = computeSecondaryPerPrimary(timeSignature);
    const primaryPerBar = timeSignature.numerator;

    const ticksPerPrimary = secondaryPerPrimary * TICKS_PER_SECONDARY;
    const ticksPerBar = ticksPerPrimary * primaryPerBar;
    const ticks = fraction.multiplyScalar(ticksPerBar);

    return TimelineVector.fromAbsoluteTicks(ticks);
  }

  static getNDivisions(timelineVector: TimelineVector, division: Fraction) {
    const { timeSignature } = timelineVector;
    const secondaryPerPrimary = computeSecondaryPerPrimary(timeSignature);
    const primaryPerBar = timeSignature.numerator;
    const secondaryPerBar = secondaryPerPrimary * primaryPerBar;
    const secondaryDivision = new Fraction(1, secondaryPerBar);

    const ticksPerDivision = division.divide(secondaryDivision).multiplyScalar(TICKS_PER_SECONDARY);
    const divisions = absFloor(timelineVector.absoluteTicks / ticksPerDivision);
    const remainderTicks = timelineVector.absoluteTicks - divisions * ticksPerDivision;
    const remainder = TimelineVector.fromAbsoluteTicks(remainderTicks, timeSignature);
    return { divisions, remainder };
  }
}
