import { observable } from 'mobx'

class TimeSignature {
  @observable numerator: number
  @observable denominator: number

  constructor(numerator = 4, denominator = 4) {
    this.numerator = numerator
    this.denominator = denominator
  }
}

class SequencerStateStore {
  @observable tempo = 120
  @observable timelineLength = 32
  @observable timeSignature = new TimeSignature()
}

export default new SequencerStateStore()
export { SequencerStateStore }
