import { action, computed, observable } from 'mobx'
import { generateId } from 'utils/generate-id'

import TimelineVector from 'core/models/timeline-vector'
import trackStore from 'core/stores/tracks'

interface IClipConstructorParams {
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
  @observable isDragging = false

  @observable dragStartX: number = 0
  @observable dragStartY: number = 0

  @computed
  get width() {
    return this.length.offsetX
  }

  @computed
  get offsetX() {
    return this.position.offsetX
  }

  constructor(params: IClipConstructorParams) {
    const { trackId, position } = params
    this.id = generateId()
    this.domId = `clip_${this.id}`

    this.trackId = trackId
    this.position = position
    this.length = new TimelineVector(2, 0, 0)
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
