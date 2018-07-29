import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';

describe('TimelineVector class', () => {
  it('constructs a timeline vector with defaults', () => {
    const position = new TimelineVector();
    expect(position.bar).toEqual(0);
    expect(position.beats).toBeInstanceOf(Fraction);
  });

  it('constructs a timeline vector with parameters', () => {
    const bar = 8;
    const beats = new Fraction(1, 2);
    const ticks = 19;

    const position = new TimelineVector(bar, beats, ticks);
    expect(position.bar).toEqual(bar);
    expect(position.beats).toEqual(beats);
    expect(position.ticks).toEqual(ticks);
  });

  it('adds timeline vectors correctly', () => {
    let a, b, sum;
    // Sums beats to whole beats
    a = new TimelineVector(4, new Fraction(1, 2));
    b = new TimelineVector(4, new Fraction(1, 2));
    sum = a.add(b);
    expect(sum.bar).toEqual(9);
    expect(sum.beats.numerator).toEqual(0);

    // Sums beats
    a = new TimelineVector(4, new Fraction(1, 2));
    b = new TimelineVector(4, new Fraction(1, 4));
    sum = a.add(b);

    expect(sum.bar).toEqual(8);
    expect(sum.beats.numerator).toEqual(3);
    expect(sum.beats.denominator).toEqual(4);

    // Sums beats with overflow bar
    a = new TimelineVector(1, new Fraction(10, 16));
    b = new TimelineVector(1, new Fraction(10, 16));
    sum = a.add(b);
    expect(sum.bar).toEqual(3);
    expect(sum.beats.numerator).toEqual(1);
    expect(sum.beats.denominator).toEqual(4);

    // Adds negative TimelineVectors
    a = new TimelineVector(1, new Fraction(1, 2));
    b = new TimelineVector(0, new Fraction(-1, 4));
    sum = a.add(b);
    expect(sum.bar).toEqual(1);
    expect(sum.beats.numerator).toEqual(1);
    expect(sum.beats.denominator).toEqual(4);
  });

  it('subtracts timeline vectors correctly', () => {
    let a, b, sum;
    // Sums beats to whole beats
    a = new TimelineVector(4, new Fraction(1, 2));
    b = new TimelineVector(4, new Fraction(1, 2));
    sum = a.subtract(b);
    expect(sum.bar).toEqual(0);
    expect(sum.beats.numerator).toEqual(0);

    // // Sums beats
    a = new TimelineVector(4, new Fraction(1, 2));
    b = new TimelineVector(4, new Fraction(1, 4));
    sum = a.subtract(b);
    expect(sum.bar).toEqual(0);
    expect(sum.beats.numerator).toEqual(1);
    expect(sum.beats.denominator).toEqual(4);

    // Sums beats with overflow bar
    a = new TimelineVector(2, new Fraction(1, 4));
    b = new TimelineVector(1, new Fraction(3, 4));
    sum = a.subtract(b);

    expect(sum.bar).toEqual(0);
    expect(sum.beats.numerator).toEqual(1);
    expect(sum.beats.denominator).toEqual(2);

    // Adds negative TimelineVectors
    a = new TimelineVector(1, new Fraction(1, 2));
    b = new TimelineVector(0, new Fraction(-1, 4));
    sum = a.subtract(b);
    expect(sum.bar).toEqual(1);
    expect(sum.beats.numerator).toEqual(3);
    expect(sum.beats.denominator).toEqual(4);
  });

  it('has a makeNegative method', () => {
    const a = new TimelineVector(1, new Fraction(1, 2));
    const b = a.makeNegative();
    expect(b.bar).toEqual(-1);
    expect(b.beats.numerator).toEqual(-1);
    expect(b.beats.denominator).toEqual(2);
  });

  it('has equality comparison operators', () => {
    const a = new TimelineVector(1, new Fraction(1, 2));
    const b = new TimelineVector(1, new Fraction(1, 4));
    const c = new TimelineVector(1, new Fraction(1, 4));

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
    expect(position.bar).toEqual(copy.bar);
    expect(position.beats).toEqual(copy.beats);
    expect(position.ticks).toEqual(copy.ticks);
    expect(position.timeSignature).toEqual(copy.timeSignature);
    expect(position.absoluteTicks).toEqual(copy.absoluteTicks);
  });

  it('has a static clamp method', () => {
    const upper = new TimelineVector(2);
    const lower = new TimelineVector(1);

    const above = new TimelineVector(3);
    const below = new TimelineVector(0);
    const between = new TimelineVector(1, new Fraction(1, 2));

    expect(TimelineVector.clamp(above, lower, upper)).toEqual(upper);
    expect(TimelineVector.clamp(below, lower, upper)).toEqual(lower);
    expect(TimelineVector.clamp(between, lower, upper)).toEqual(between);
  });

  it('has a static isBetween method', () => {
    const upper = new TimelineVector(2);
    const lower = new TimelineVector(1);

    const above = new TimelineVector(3);
    const below = new TimelineVector(0);
    const between = new TimelineVector(1, new Fraction(1, 2));

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
    const between = new TimelineVector(1, new Fraction(1, 2));

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

  it.only('has a static fromAbsoluteTicks method', () => {
    const a = new TimelineVector(1, new Fraction(1, 16), 100);
    const ticks = a.absoluteTicks;
    const b = TimelineVector.fromAbsoluteTicks(ticks);

    expect(a).toEqual(b);
    expect(a.absoluteTicks).toEqual(b.absoluteTicks);
  });

  it.only('has a static fromAbsoluteTicks method', () => {
    const a = new TimelineVector(1, new Fraction(1, 16), 100);
    const ticks = a.absoluteTicks;
    const b = TimelineVector.fromAbsoluteTicks(ticks);

    expect(a).toEqual(b);
    expect(a.absoluteTicks).toEqual(b.absoluteTicks);
  });

  it.only('has a static getNDivisions method', () => {
    const vector = new TimelineVector(2);
    const division = new Fraction(1, 8);

    expect(TimelineVector.getNDivisions(vector, division)).toEqual(16);
  });
});
