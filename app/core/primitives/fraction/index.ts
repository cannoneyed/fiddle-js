import { getGCD } from './helpers';

export class Fraction {
  numerator: number;
  denominator: number;

  constructor(numerator: number = 1, denominator: number = 1) {
    this.denominator = denominator;

    // Correct for negative zero (lol JS)
    this.numerator = numerator === 0 ? 0 : numerator;

    // Don't allow divide by zero
    if (this.denominator === 0) {
      this.numerator = this.numerator >= 0 ? Infinity : -Infinity;
      this.denominator = 1;
    }

    // Only allow negative numerators
    if (this.denominator < 0) {
      this.numerator *= -1;
      this.denominator *= -1;
    }
  }

  add(other: Fraction): Fraction;
  add(numerator: number, denominator: number): Fraction;
  add(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a;

    const nextNumerator = this.numerator * other.denominator + other.numerator * this.denominator;
    const nextDenominator = this.denominator * other.denominator;
    return new Fraction(nextNumerator, nextDenominator).reduce();
  }

  subtract(other: Fraction): Fraction;
  subtract(numerator: number, denominator: number): Fraction;
  subtract(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a;

    const nextNumerator = this.numerator * other.denominator - other.numerator * this.denominator;
    const nextDenominator = this.denominator * other.denominator;
    return new Fraction(nextNumerator, nextDenominator).reduce();
  }

  multiply(other: Fraction): Fraction;
  multiply(numerator: number, denominator: number): Fraction;
  multiply(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a;
    const { numerator, denominator } = other;
    return new Fraction(this.numerator * numerator, this.denominator * denominator);
  }

  divide(other: Fraction): Fraction;
  divide(numerator: number, denominator: number): Fraction;
  divide(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a;
    const { numerator, denominator } = other;
    return new Fraction(this.numerator * denominator, this.denominator * numerator);
  }

  mixedNumber() {
    const number = Math.floor(this.numerator / this.denominator);
    const fraction = new Fraction(this.numerator - number * this.denominator, this.denominator);
    return { number, fraction };
  }

  inverse() {
    return new Fraction(this.denominator, this.numerator);
  }

  multiplyScalar(x: number) {
    return this.numerator * x / this.denominator;
  }

  reduce() {
    const gcd = getGCD(this.numerator, this.denominator);
    return new Fraction(this.numerator / gcd, this.denominator / gcd);
  }

  toString() {
    return `${this.numerator} / ${this.denominator}`;
  }
}
