import { action, computed, observable } from 'mobx'
import { generateId } from 'utils/id'

class Track {
  @observable id = null
  @observable type = 'osc'

  @observable clipMap = observable.map({})

  constructor() {
    this.id = generateId()
  }

  @computed get clips() {
    return this.clipMap.values()
  }

  @action addClip = (clip) => {
    this.clipMap.set(clip.id, clip)
  }

  @action removeClip = (clipId) => {
    this.clipMap.delete(clipId)
  }
}

export default Track
