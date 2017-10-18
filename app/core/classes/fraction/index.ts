import { getGCD } from './helpers'

class Fraction {
  numerator: number
  denominator: number

  constructor(numerator: number = 1, denominator: number = 1) {
    this.numerator = numerator
    this.denominator = denominator
  }

  add(other: Fraction): Fraction
  add(numerator: number, denominator: number): Fraction
  add(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a
    const { numerator, denominator } = other
    return new Fraction(this.numerator + numerator, this.denominator + denominator)
  }

  subtract(other: Fraction): Fraction
  subtract(numerator: number, denominator: number): Fraction
  subtract(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a
    const { numerator, denominator } = other
    return new Fraction(this.numerator - numerator, this.denominator - denominator)
  }

  multiply(other: Fraction): Fraction
  multiply(numerator: number, denominator: number): Fraction
  multiply(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a
    const { numerator, denominator } = other
    return new Fraction(this.numerator * numerator, this.denominator * denominator)
  }

  divide(other: Fraction): Fraction
  divide(numerator: number, denominator: number): Fraction
  divide(a: any, b?: any): Fraction {
    const other = typeof a === 'number' ? new Fraction(a, b) : a
    const { numerator, denominator } = other
    return new Fraction(this.numerator * denominator, this.denominator * numerator)
  }

  inverse() {
    return new Fraction(this.denominator, this.numerator)
  }

  multiplyScalar(x: number) {
    return this.numerator * x / this.denominator
  }

  reduce() {
    const gcd = getGCD(this.numerator, this.denominator)
    return new Fraction(this.numerator / gcd, this.denominator / gcd)
  }
}

export default Fraction
