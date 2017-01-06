import { computed, observable } from 'mobx'
import { generateId } from 'utils/id'

import { Position } from 'core/sequencer/position'

class Clip {
  @observable id
  @observable trackId
  @observable length
  @observable position

  @observable selected = false

  @computed get width() {
    return this.length.offsetX + 1
  }

  @computed get offsetX() {
    return this.position.offsetX - 1
  }

  constructor({ trackId, position }) {
    this.id = generateId()
    this.trackId = trackId
    this.position = position
    this.length = new Position(2, 0, 0)
  }
}

export default Clip
