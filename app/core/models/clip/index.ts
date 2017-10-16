import { action, computed, observable } from 'mobx'
import { generateId } from 'utils/generate-id'

import ScreenPosition from 'core/models/screen-position'
import TimelineVector from 'core/models/timeline-vector'
import trackStore from 'core/stores/tracks'

export interface IClipConstructorParams {
  trackId: string
  position: TimelineVector
}

class Clip {
  id: string
  domId: string

  @observable trackId: string
  @observable length: TimelineVector
  @observable position: TimelineVector

  @observable isSelected = false

  constructor(params: IClipConstructorParams) {
    const { trackId, position } = params
    this.id = generateId()
    this.domId = `clip_${this.id}`

    this.trackId = trackId
    this.position = position
    this.length = new TimelineVector(2, 0, 0)
  }

  @computed
  get width() {
    return this.length.offsetX
  }

  @computed
  get offsetX() {
    return this.position.offsetX
  }

  @computed
  get offsetY() {
    return 0
  }

  @computed
  get track() {
    return trackStore.getTrackById(this.trackId)
  }

  getScreenPosition = () => {
    const clipElement = document.getElementById(this.domId)
    if (clipElement) {
      const { left, top } = clipElement.getBoundingClientRect()
      return new ScreenPosition(left, top)
    }
    return new ScreenPosition()
  }

  @action
  delete = () => {
    // Delete reference from the track
    const track = trackStore.getTrackById(this.trackId)
    if (track) {
      // track.removeClip(this.id)
    }

    // Delete from the clipStore store
  }
}

export default Clip
export { Clip }
