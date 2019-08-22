import { Simple } from 'mobx-keystone';
import { getGCD } from './helpers';

const { floor, abs } = Math;

export interface FractionSnapshot {
  readonly numerator: number;
  readonly denominator: number;
}

export class Fraction extends Simple<FractionSnapshot> {
  readonly numerator: number;
  readonly denominator: number;

  constructor(numerator: number = 1, denominator: number = 1) {
    super();
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
    this.initialSnapshot();
  }

  toSnapshot() {
    return { numerator: this.numerator, denominator: this.denominator };
  }

  static fromSnapshot(snapshot: FractionSnapshot) {
    return new Fraction(snapshot.numerator, snapshot.denominator);
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
      return new Fraction(this.numerator * a.numerator, this.denominator * a.denominator).reduce();
    }
    const numerator = a;
    const denominator = b === undefined ? 1 : b;
    return new Fraction(this.numerator * numerator, this.denominator * denominator).reduce();
  }

  divide(other: Fraction): Fraction;
  divide(n: number): Fraction;
  divide(numerator: number, denominator: number): Fraction;
  divide(a: number | Fraction, b?: number): Fraction {
    if (a instanceof Fraction) {
      return new Fraction(this.numerator * a.denominator, this.denominator * a.numerator).reduce();
    }
    const numerator = a;
    const denominator = b === undefined ? 1 : b;
    return new Fraction(this.numerator * denominator, this.denominator * numerator).reduce();
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

  lt(other: Fraction) {
    return this.numerator / this.denominator < other.numerator / other.denominator;
  }

  lte(other: Fraction) {
    return this.numerator / this.denominator <= other.numerator / other.denominator;
  }

  gt(other: Fraction) {
    return this.numerator / this.denominator > other.numerator / other.denominator;
  }

  gte(other: Fraction) {
    return this.numerator / this.denominator >= other.numerator / other.denominator;
  }

  equals(other: Fraction) {
    return this.numerator / this.denominator === other.numerator / other.denominator;
  }

  toString() {
    return `${this.numerator} / ${this.denominator}`;
  }

  copy() {
    return new Fraction(this.numerator, this.denominator);
  }
}
