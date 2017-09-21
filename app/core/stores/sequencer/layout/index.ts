import { observable } from 'mobx'

class SequencerLayoutStore {
  @observable toolbarHeight: number = 40
  @observable timelineHeight: number = 30
  @observable gutterWidth: number = 200
  @observable tracksAreaHeight: number = 500
}

export default new SequencerLayoutStore()
export { SequencerLayoutStore }
