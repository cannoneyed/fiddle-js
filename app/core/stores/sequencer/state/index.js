import { observable } from 'mobx'

class SequencerState {
  @observable tempo = 120
  @observable timelineLength = 32
  @observable timeSignature = {
    numerator: 4,
    denominator: 4,
  }
}

export default new SequencerState()
export { SequencerState }
