import { computed, observable } from 'mobx'
import { generateId } from 'utils/id'

import clipStore from 'core/stores/clips'

class Track {
  @observable id
  @observable type = 'osc'

  constructor() {
    this.id = generateId()
  }

  @computed get clips() {
    return clipStore.clips.values().filter(clip => clip.trackId === this.id)
  }
}

export default Track
