import { observable } from 'mobx'

export class TimeSignature {
  @observable numerator: number
  @observable denominator: number

  constructor(numerator = 4, denominator = 4) {
    this.numerator = numerator
    this.denominator = denominator
  }
}
