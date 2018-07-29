import { Fraction } from 'core/primitives/fraction';

describe('Fraction class', () => {
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
});
