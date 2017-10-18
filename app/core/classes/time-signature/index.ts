import { observable } from 'mobx'

class TimeSignature {
  @observable numerator: number
  @observable denominator: number

  constructor(numerator = 4, denominator = 4) {
    this.numerator = numerator
    this.denominator = denominator
  }
}

export default TimeSignature
