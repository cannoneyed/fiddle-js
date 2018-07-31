import { Fraction } from 'core/primitives/fraction';
import { TimelineVector, TICKS_PER_TERTIARY } from 'core/primitives/timeline-vector';

describe('TimelineVector class', () => {
  it('constructs a timeline vector with defaults', () => {
    const position = new TimelineVector();
    expect(position.primary).toEqual(0);
    expect(position.secondary).toEqual(0);
    expect(position.tertiary).toEqual(0);
    expect(position.ticks).toEqual(0);
    expect(position.timeSignature).toEqual(new Fraction(4, 4));
  });

  it('constructs a timeline vector with parameters', () => {
    const primary = 8;
    const secondary = 2;
    const tertiary = 1;
    const ticks = 19;

    const position = new TimelineVector(primary, secondary, tertiary, ticks);
    expect(position.primary).toEqual(primary);
    expect(position.secondary).toEqual(secondary);
    expect(position.tertiary).toEqual(tertiary);
    expect(position.ticks).toEqual(ticks);
  });

  it('carries over overlapping secondary division', () => {
    const primary = 4;
    const secondary = 5;

    const position = new TimelineVector(primary, secondary);
    expect(position.primary).toEqual(5);
    expect(position.secondary).toEqual(1);
  });

  it('carries over overlapping tertiary division', () => {
    const primary = 4;
    const secondary = 3;
    const tertiary = 13;

    const position = new TimelineVector(primary, secondary, tertiary);
    expect(position.primary).toEqual(5);
    expect(position.secondary).toEqual(0);
    expect(position.tertiary).toEqual(1);
  });

  it('carries over overlapping ticks', () => {
    const primary = 1;
    const secondary = 3;
    const tertiary = 11;
    const ticks = TICKS_PER_TERTIARY + 1;

    const position = new TimelineVector(primary, secondary, tertiary, ticks);
    expect(position.primary).toEqual(2);
    expect(position.secondary).toEqual(0);
    expect(position.tertiary).toEqual(0);
    expect(position.ticks).toEqual(1);
  });

  it('carries over overlapping secondary division in 3/4', () => {
    const primary = 2;
    const secondary = 3;
    const timeSignature = new Fraction(3, 4);

    const position = new TimelineVector(primary, secondary, 0, 0, timeSignature);
    expect(position.primary).toEqual(3);
    expect(position.secondary).toEqual(0);
  });

  it('has a beats getter', () => {
    let position = new TimelineVector(0, 1);
    expect(position.beats).toEqual(new Fraction(1, 4));

    position = new TimelineVector(0, 1, 3);
    expect(position.beats).toEqual(new Fraction(1, 2));
  });

  it('adds timeline vectors correctly', () => {
    let a, b, sum;
    // Sums beats to whole beats
    a = new TimelineVector(4, 2);
    b = new TimelineVector(4, 2);
    sum = a.add(b);
    expect(sum.primary).toEqual(9);
    expect(sum.secondary).toEqual(0);

    // Sums beats
    a = new TimelineVector(4, 2);
    b = new TimelineVector(4, 1);
    sum = a.add(b);

    expect(sum.primary).toEqual(8);
    expect(sum.secondary).toEqual(3);

    // Sums beats with overflow bar
    a = new TimelineVector(1, 2, 6);
    b = new TimelineVector(1, 2, 6);
    sum = a.add(b);
    expect(sum.primary).toEqual(3);
    expect(sum.secondary).toEqual(1);
    expect(sum.tertiary).toEqual(0);

    // Adds negative TimelineVectors
    a = new TimelineVector(1, 2);
    b = new TimelineVector(0, -1);
    sum = a.add(b);
    expect(sum.primary).toEqual(1);
    expect(sum.secondary).toEqual(1);
  });

  it('subtracts timeline vectors correctly', () => {
    let a, b, sum;
    // Sums beats to whole beats
    a = new TimelineVector(4, 2);
    b = new TimelineVector(4, 2);
    sum = a.subtract(b);
    expect(sum.primary).toEqual(0);
    expect(sum.secondary).toEqual(0);

    // // Sums beats
    a = new TimelineVector(4, 2);
    b = new TimelineVector(4, 1);
    sum = a.subtract(b);
    expect(sum.primary).toEqual(0);
    expect(sum.secondary).toEqual(1);

    // Sums beats with overflow bar
    a = new TimelineVector(2, 1);
    b = new TimelineVector(1, 3);
    sum = a.subtract(b);

    expect(sum.primary).toEqual(0);
    expect(sum.secondary).toEqual(2);

    // Adds negative TimelineVectors
    a = new TimelineVector(1, 2);
    b = new TimelineVector(0, -1);
    sum = a.subtract(b);
    expect(sum.primary).toEqual(1);
    expect(sum.secondary).toEqual(3);
  });

  it('has a makeNegative method', () => {
    const a = new TimelineVector(1, 2);
    const b = a.makeNegative();
    expect(b.primary).toEqual(-1);
    expect(b.secondary).toEqual(-2);
  });

  it('has equality comparison operators', () => {
    const a = new TimelineVector(1, 2);
    const b = new TimelineVector(1, 1);
    const c = new TimelineVector(1, 1);

    // Equality
    expect(b.equals(a)).toBe(false);
    expect(a.equals(b)).toBe(false);
    expect(b.equals(c)).toBe(true);

    // Less than
    expect(b.lt(a)).toBe(true);
    expect(a.lt(b)).toBe(false);
    expect(b.lt(c)).toBe(false);

    // Greater than
    expect(b.gt(a)).toBe(false);
    expect(a.gt(b)).toBe(true);
    expect(b.gt(c)).toBe(false);

    // Less than or equal to
    expect(b.lte(a)).toBe(true);
    expect(a.lte(b)).toBe(false);
    expect(b.lte(c)).toBe(true);

    // Greater than or equal to
    expect(b.gte(a)).toBe(false);
    expect(a.gte(b)).toBe(true);
    expect(b.gte(c)).toBe(true);
  });

  it('has a copy method', () => {
    const position = new TimelineVector();
    const copy = position.copy();
    expect(position).toEqual(copy);
  });

  it('has a static clamp method', () => {
    const upper = new TimelineVector(2);
    const lower = new TimelineVector(1);

    const above = new TimelineVector(3);
    const below = new TimelineVector(0);
    const between = new TimelineVector(1, 2);

    expect(TimelineVector.clamp(above, lower, upper)).toEqual(upper);
    expect(TimelineVector.clamp(below, lower, upper)).toEqual(lower);
    expect(TimelineVector.clamp(between, lower, upper)).toEqual(between);
  });

  it('has a static isBetween method', () => {
    const upper = new TimelineVector(2);
    const lower = new TimelineVector(1);

    const above = new TimelineVector(3);
    const below = new TimelineVector(0);
    const between = new TimelineVector(1, 2);

    expect(TimelineVector.isBetween(above, lower, upper)).toEqual(false);
    expect(TimelineVector.isBetween(below, lower, upper)).toEqual(false);
    expect(TimelineVector.isBetween(between, lower, upper)).toEqual(true);
    expect(TimelineVector.isBetween(upper, lower, upper)).toEqual(false);
    expect(TimelineVector.isBetween(lower, lower, upper)).toEqual(false);
  });

  it('has a static isBetweenInclusive method', () => {
    const upper = new TimelineVector(2);
    const lower = new TimelineVector(1);

    const above = new TimelineVector(3);
    const below = new TimelineVector(0);
    const between = new TimelineVector(1, 2);

    expect(TimelineVector.isBetweenInclusive(above, lower, upper)).toEqual(false);
    expect(TimelineVector.isBetweenInclusive(below, lower, upper)).toEqual(false);
    expect(TimelineVector.isBetweenInclusive(between, lower, upper)).toEqual(true);
    expect(TimelineVector.isBetweenInclusive(upper, lower, upper)).toEqual(true);
    expect(TimelineVector.isBetweenInclusive(lower, lower, upper)).toEqual(true);
  });

  it('has a static sortAscending method', () => {
    const a = new TimelineVector(1);
    const b = new TimelineVector(2);
    const c = new TimelineVector(3);

    const positions = [c, b, a];
    expect(TimelineVector.sortAscending(positions)).toEqual([a, b, c]);
  });

  it('has a static fromAbsoluteTicks method', () => {
    const a = new TimelineVector(1, 0, 1, 100);
    const ticks = a.absoluteTicks;
    const b = TimelineVector.fromAbsoluteTicks(ticks);

    expect(a).toEqual(b);
  });

  it('has a static fromFraction method', () => {
    const fraction = new Fraction(1, 4);
    const a = TimelineVector.fromFraction(fraction);
    const b = new TimelineVector(0, 1);

    expect(a).toEqual(b);
  });

  it('has a static getNDivisions method', () => {
    const vector = new TimelineVector(2);
    const division = new Fraction(1, 8);

    const result = TimelineVector.getNDivisions(vector, division);
    expect(result.divisions).toEqual(16);
    expect(result.remainder).toEqual(new TimelineVector(0));
  });

  it('getNDivisions computes a remainder', () => {
    const vector = new TimelineVector(2, 0, 1);
    const division = new Fraction(1, 8);

    const result = TimelineVector.getNDivisions(vector, division);
    expect(result.divisions).toEqual(16);
    expect(result.remainder).toEqual(new TimelineVector(0, 0, 1));
  });
});
