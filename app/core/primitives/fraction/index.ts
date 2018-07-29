import { getGCD } from './helpers';

const { floor, abs } = Math;

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
  multiply(n: number): Fraction;
  multiply(numerator: number, denominator: number): Fraction;
  multiply(a: number | Fraction, b?: number): Fraction {
    if (a instanceof Fraction) {
      return new Fraction(this.numerator * a.numerator, this.denominator * a.denominator);
    }
    const numerator = a;
    const denominator = b === undefined ? 1 : b;
    return new Fraction(this.numerator * numerator, this.denominator * denominator);
  }

  divide(other: Fraction): Fraction;
  divide(n: number): Fraction;
  divide(numerator: number, denominator: number): Fraction;
  divide(a: number | Fraction, b?: number): Fraction {
    if (a instanceof Fraction) {
      return new Fraction(this.numerator * a.denominator, this.denominator * a.numerator);
    }
    const numerator = a;
    const denominator = b === undefined ? 1 : b;
    return new Fraction(this.numerator * denominator, this.denominator * numerator);
  }

  mixedNumber() {
    const { numerator, denominator } = this;
    const isNegative = numerator < 0 ? !(denominator < 0) : denominator < 0; // XOR negative

    let number = floor(abs(numerator) / abs(denominator));
    number = isNegative ? -number : number;

    let nextNumerator = abs(numerator) - abs(number * denominator);
    nextNumerator = isNegative ? -nextNumerator : nextNumerator;

    const fraction = new Fraction(nextNumerator, denominator);
    return { number, fraction };
  }

  inverse() {
    return new Fraction(this.denominator, this.numerator);
  }

  multiplyScalar(x: number) {
    return (this.numerator * x) / this.denominator;
  }

  reduce() {
    const gcd = getGCD(this.numerator, this.denominator);
    return new Fraction(this.numerator / gcd, this.denominator / gcd);
  }

  isLessThan(other: Fraction) {
    return this.numerator / this.denominator < other.numerator / other.denominator;
  }

  isGreaterThan(other: Fraction) {
    return this.numerator / this.denominator > other.numerator / other.denominator;
  }

  isEqualTo(other: Fraction) {
    return this.numerator / this.denominator === other.numerator / other.denominator;
  }

  toString() {
    return `${this.numerator} / ${this.denominator}`;
  }
}
