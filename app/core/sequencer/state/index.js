import { observable } from 'mobx'
import autobind from 'autobind-decorator'

@autobind
class SequencerStore {
  @observable tempo = 120
  @observable timelineLength = 32
  @observable timeSignature = {
    numerator: 4,
    denominator: 4,
  }
}

const sequencerStore = new SequencerStore()

export default sequencerStore
export { SequencerStore }
