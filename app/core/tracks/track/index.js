import { observable } from 'mobx'
import { generateId } from 'utils/id'

class Track {
  @observable id = null
  @observable type = 'osc'

  constructor() {
    this.id = generateId()
  }
}

export default Track
