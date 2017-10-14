import { observable } from 'mobx'

class SequencerLayoutStore {
  @observable minimapHeight: number = 60
  @observable gutterWidth: number = 200
  @observable timelineHeight: number = 30
  @observable toolbarHeight: number = 40
  @observable tracksAreaHeight: number = 500
}

export default new SequencerLayoutStore()
export { SequencerLayoutStore }
