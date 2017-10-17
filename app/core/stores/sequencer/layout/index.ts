import { observable } from 'mobx'

import { computed } from 'mobx'
import windowStore from 'core/stores/window'

class SequencerLayoutStore {
  @observable minimapHeight: number = 60
  @observable gutterWidth: number = 200
  @observable timelineHeight: number = 30
  @observable toolbarHeight: number = 40
  @observable tracksAreaHeight: number = 500

  @computed
  get tracksAreaWidth() {
    return windowStore.width - this.gutterWidth
  }
}

export default new SequencerLayoutStore()
export { SequencerLayoutStore }
