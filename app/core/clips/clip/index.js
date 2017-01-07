import { action, computed, observable } from 'mobx'
import { generateId } from 'utils/id'

import { Position } from 'core/sequencer/position'
import tracks from 'core/tracks'
import clips from 'core/clips'

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

  @action delete = () => {
    // Delete reference from the track
    const track = tracks.getTrackById(this.trackId)
    track.removeClip(this.id)

    // Delete from the clips store

  }
}

export default Clip
