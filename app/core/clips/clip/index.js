import { observable } from 'mobx'
import { generateId } from 'utils/id'

class Clip {
  @observable id
  @observable trackId
  @observable length = 1
  @observable position

  @observable selected = false

  constructor({ trackId, position }) {
    this.id = generateId()
    this.trackId = trackId
    this.position = position
  }
}

export default Clip
