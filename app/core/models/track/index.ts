import { computed, observable } from 'mobx'
import { generateId } from 'utils/generate-id'

import { clipStore } from 'core/stores/clips'

export class Track {
  @observable id: string
  @observable type = 'osc'

  constructor() {
    this.id = generateId()
  }

  @computed
  get clips() {
    return clipStore.getClips().filter(clip => clip.trackId === this.id)
  }
}
