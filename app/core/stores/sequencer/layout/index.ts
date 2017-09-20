import { observable } from 'mobx'

class SequencerLayoutStore {
  @observable trackHeadersWidth: number = 200
  @observable sequencerAreaHeight: number = 500
}

export default new SequencerLayoutStore()
export { SequencerLayoutStore }
