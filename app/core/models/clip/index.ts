import { action, computed, observable } from 'mobx'
import { generateId } from 'utils/id'

import Position from 'core/models/position'
// import trackStore from 'core/stores/tracks'

interface IClipConstructorParams {
  trackId: string
  position: Position
}

class Clip {
  id: string
  domId: string

  @observable trackId: string
  @observable length: Position
  @observable position: Position

  @observable isSelected = false
  @observable isDragging = false

  @observable dragStartX: number | null = null
  @observable dragStartY: number | null = null

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
    this.length = new Position(2, 0, 0)
  }

  @action
  delete = () => {
    // // Delete reference from the track
    // const track = trackStore.getTrackById(this.trackId)
    // track && track.removeClip(this.id)
    // // Delete from the clipStore store
  }
}

export default Clip
export { Clip }
