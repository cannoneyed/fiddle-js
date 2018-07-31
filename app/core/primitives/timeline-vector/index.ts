import { Fraction } from 'core/primitives/fraction';
import { absFloor } from 'utils/math';

export const TICKS_PER_TERTIARY = 240;
const defaultTimeSignature = () => new Fraction(4, 4);

const computeTertiaryPerSecondary = (timeSignature: Fraction) => {
  return 12; // TODO: Figure out 6/8 time signatures
};

const computeDivisions = (absoluteTicks: number, timeSignature: Fraction) => {
  const tertiaryPerSecondary = computeTertiaryPerSecondary(timeSignature);
  const secondaryPerPrimary = timeSignature.numerator;
  const ticksPerSecondary = tertiaryPerSecondary * TICKS_PER_TERTIARY;
  const ticksPerPrimary = ticksPerSecondary * secondaryPerPrimary;

  let computedTicks = absoluteTicks;
  const primary = absFloor(computedTicks / ticksPerPrimary);
  computedTicks -= primary * ticksPerPrimary;
  const secondary = absFloor(computedTicks / ticksPerSecondary);
  computedTicks -= secondary * ticksPerSecondary;
  const tertiary = absFloor(computedTicks / TICKS_PER_TERTIARY);
  computedTicks -= tertiary * TICKS_PER_TERTIARY;
  const ticks = computedTicks;

  return { primary, secondary, tertiary, ticks };
};

export class TimelineVector {
  readonly absoluteTicks: number;
  readonly primary: number;
  readonly secondary: number;
  readonly tertiary: number;
  readonly ticks: number;

  constructor(
    primary = 0,
    secondary = 0,
    tertiary = 0,
    ticks = 0,
    public readonly timeSignature = defaultTimeSignature()
  ) {
    const tertiaryPerSecondary = computeTertiaryPerSecondary(timeSignature);
    const secondaryPerPrimary = timeSignature.numerator;

    const ticksPerSecondary = tertiaryPerSecondary * TICKS_PER_TERTIARY;
    const ticksPerPrimary = ticksPerSecondary * secondaryPerPrimary;

    const absoluteTicks =
      primary * ticksPerPrimary +
      secondary * ticksPerSecondary +
      tertiary * TICKS_PER_TERTIARY +
      ticks;
    this.absoluteTicks = absoluteTicks;

    const computed = computeDivisions(absoluteTicks, timeSignature);
    this.primary = computed.primary;
    this.secondary = computed.secondary;
    this.tertiary = computed.tertiary;
    this.ticks = computed.ticks;
  }

  get beats() {
    const { denominator } = this.timeSignature;
    const tertiaryPerSecondary = computeTertiaryPerSecondary(this.timeSignature);
    // TODO: Multiple time signatures
    const secondary = new Fraction(this.secondary, denominator);
    const tertiary = new Fraction(this.tertiary, tertiaryPerSecondary);
    return secondary.add(tertiary).reduce();
  }

  makeNegative() {
    const { primary, secondary, tertiary, ticks, timeSignature } = this;
    return new TimelineVector(-primary, -secondary, -tertiary, -ticks, timeSignature);
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
      this.primary,
      this.secondary,
      this.tertiary,
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
    const { primary, secondary, tertiary, ticks } = computeDivisions(absoluteTicks, timeSignature);
    return new TimelineVector(primary, secondary, tertiary, ticks, timeSignature);
  }

  static fromFraction(fraction: Fraction, timeSignature = defaultTimeSignature()) {
    const tertiaryPerSecondary = computeTertiaryPerSecondary(timeSignature);
    const secondaryPerPrimary = timeSignature.numerator;

    const ticksPerSecondary = tertiaryPerSecondary * TICKS_PER_TERTIARY;
    const ticksPerPrimary = ticksPerSecondary * secondaryPerPrimary;
    const ticks = fraction.multiplyScalar(ticksPerPrimary);

    return TimelineVector.fromAbsoluteTicks(ticks);
  }

  static getNDivisions(timelineVector: TimelineVector, division: Fraction) {
    const { timeSignature } = timelineVector;
    const tertiaryPerSecondary = computeTertiaryPerSecondary(timeSignature);
    const secondaryPerPrimary = timeSignature.numerator;
    const tertiaryPerPrimary = tertiaryPerSecondary * secondaryPerPrimary;
    const tertiaryDivision = new Fraction(1, tertiaryPerPrimary);

    const ticksPerDivision = division.divide(tertiaryDivision).multiplyScalar(TICKS_PER_TERTIARY);
    const divisions = absFloor(timelineVector.absoluteTicks / ticksPerDivision);
    const remainderTicks = timelineVector.absoluteTicks - divisions * ticksPerDivision;
    const remainder = TimelineVector.fromAbsoluteTicks(remainderTicks, timeSignature);
    return { divisions, remainder };
  }
}
