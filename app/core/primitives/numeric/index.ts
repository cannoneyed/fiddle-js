export class Numeric {
  constructor(protected number: number) {}
  private getOtherNumber(other: number | Numeric): number {
    return other instanceof Numeric ? other.number : other;
  }

  add(other: number | Numeric) {
    return new (<any>this.constructor)(this.number + this.getOtherNumber(other));
  }

  subtract(other: Numeric) {
    return new (<any>this.constructor)(this.number - this.getOtherNumber(other));
  }

  multiply(other: Numeric) {
    return new (<any>this.constructor)(this.number * this.getOtherNumber(other));
  }

  divide(other: Numeric) {
    return new (<any>this.constructor)(this.number / this.getOtherNumber(other));
  }
}
