import { observable } from 'mobx'

import { computed } from 'mobx'

class SequencerLayoutStore {
  @observable minimapHeight: number = 60
  @observable gutterWidth: number = 200
  @observable timelineHeight: number = 30
  @observable toolbarHeight: number = 40
  @observable tracksAreaHeight: number = 500

  @computed
  get tracksAreaWidth() {
    return window.innerWidth - this.gutterWidth
  }
}

export default new SequencerLayoutStore()
export { SequencerLayoutStore }
