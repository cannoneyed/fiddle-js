import { Fraction } from 'core/primitives/fraction';

describe('Fraction class', () => {
  it('constructs a fraction with defaults', () => {
    const f = new Fraction();
    const { numerator, denominator } = f;
    expect(numerator).toEqual(1);
    expect(denominator).toEqual(1);
  });

  it('constructs a fraction with negative numerator', () => {
    const f = new Fraction(-1, 2);
    const { numerator, denominator } = f;
    expect(numerator).toEqual(-1);
    expect(denominator).toEqual(2);
  });

  it('constructs a fraction with negative 0 numerator', () => {
    const f = new Fraction(-0, 1);
    const { numerator, denominator } = f;
    expect(numerator).toEqual(0);
    expect(denominator).toEqual(1);
  });

  it('constructs a fraction with 0 denominator', () => {
    const f = new Fraction(1, 0);
    const { numerator, denominator } = f;
    expect(numerator).toEqual(Infinity);
    expect(denominator).toEqual(1);
  });

  it('constructs a fraction with negative denominator', () => {
    const f = new Fraction(1, -2);
    const { numerator, denominator } = f;
    expect(numerator).toEqual(-1);
    expect(denominator).toEqual(2);
  });

  it('adds fractions', () => {
    const a = new Fraction(1, 4);
    const b = new Fraction(1, 2);

    let result = a.add(b);
    expect(result.numerator).toEqual(3);
    expect(result.denominator).toEqual(4);

    result = b.add(a);
    expect(result.numerator).toEqual(3);
    expect(result.denominator).toEqual(4);

    result = a.add(1, 2);
    expect(result.numerator).toEqual(3);
    expect(result.denominator).toEqual(4);

    result = a.add(-1, 2);
    expect(result.numerator).toEqual(-1);
    expect(result.denominator).toEqual(4);
  });

  it('subtracts fractions', () => {
    const a = new Fraction(1, 4);
    const b = new Fraction(1, 2);

    let result = a.subtract(b);
    expect(result.numerator).toEqual(-1);
    expect(result.denominator).toEqual(4);

    result = b.subtract(a);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(4);

    result = a.subtract(1, 2);
    expect(result.numerator).toEqual(-1);
    expect(result.denominator).toEqual(4);

    result = a.subtract(-1, 2);
    expect(result.numerator).toEqual(3);
    expect(result.denominator).toEqual(4);
  });

  it('multiplies fractions', () => {
    const a = new Fraction(1, 4);
    const b = new Fraction(1, 2);

    let result = a.multiply(b);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(8);

    result = b.multiply(a);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(8);

    result = a.multiply(1, 2);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(8);

    result = a.multiply(2);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(2);
  });

  it('divides fractions', () => {
    const a = new Fraction(1, 4);
    const b = new Fraction(1, 2);

    let result = a.divide(b);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(2);

    result = b.divide(a);
    expect(result.numerator).toEqual(2);
    expect(result.denominator).toEqual(1);

    result = a.divide(1, 2);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(2);

    result = a.divide(2);
    expect(result.numerator).toEqual(1);
    expect(result.denominator).toEqual(8);
  });

  it('makes a mixed number when zero', () => {
    const f = new Fraction(0, 2);
    const { number, fraction } = f.mixedNumber();
    expect(number).toEqual(0);
    expect(fraction.numerator).toEqual(0);
    expect(fraction.denominator).toEqual(2);
  });

  it('makes a mixed number when less than one', () => {
    const f = new Fraction(1, 2);
    const { number, fraction } = f.mixedNumber();
    expect(number).toEqual(0);
    expect(fraction.numerator).toEqual(1);
    expect(fraction.denominator).toEqual(2);
  });

  it('makes a mixed number when greater than one', () => {
    const f = new Fraction(3, 2);
    const { number, fraction } = f.mixedNumber();
    expect(number).toEqual(1);
    expect(fraction.numerator).toEqual(1);
    expect(fraction.denominator).toEqual(2);
  });

  it('has an inverse method', () => {
    const f = new Fraction(3, 2);
    const { numerator, denominator } = f.inverse();
    expect(numerator).toEqual(2);
    expect(denominator).toEqual(3);
  });

  it('has an multiply scalar method', () => {
    const f = new Fraction(1, 2);
    const result = f.multiplyScalar(100);
    expect(result).toEqual(50);
  });

  it('has a reduce method', () => {
    let f = new Fraction(4, 16).reduce();
    expect(f.numerator).toEqual(1);
    expect(f.denominator).toEqual(4);

    f = new Fraction(5, 16).reduce();
    expect(f.numerator).toEqual(5);
    expect(f.denominator).toEqual(16);
  });

  it('has an equals method', () => {
    const a = new Fraction(4, 16);
    const b = new Fraction(1, 16);
    const c = new Fraction(1, 4);

    expect(a.equals(b)).toEqual(false);
    expect(b.equals(a)).toEqual(false);
    expect(a.equals(c)).toEqual(true);
  });

  it('has a less than method', () => {
    const a = new Fraction(4, 16);
    const b = new Fraction(1, 16);
    const c = new Fraction(1, 4);

    expect(a.lt(b)).toEqual(false);
    expect(b.lt(a)).toEqual(true);
    expect(a.lt(c)).toEqual(false);
  });

  it('has a less than or equals method', () => {
    const a = new Fraction(4, 16);
    const b = new Fraction(1, 16);
    const c = new Fraction(1, 4);

    expect(a.lte(b)).toEqual(false);
    expect(b.lte(a)).toEqual(true);
    expect(a.lte(c)).toEqual(true);
  });

  it('has a greater than method', () => {
    const a = new Fraction(4, 16);
    const b = new Fraction(1, 16);
    const c = new Fraction(1, 4);

    expect(a.gt(b)).toEqual(true);
    expect(b.gt(a)).toEqual(false);
    expect(a.gt(c)).toEqual(false);
  });

  it('has a greater than or equals method', () => {
    const a = new Fraction(4, 16);
    const b = new Fraction(1, 16);
    const c = new Fraction(1, 4);

    expect(a.gte(b)).toEqual(true);
    expect(b.gte(a)).toEqual(false);
    expect(a.gte(c)).toEqual(true);
  });
});
