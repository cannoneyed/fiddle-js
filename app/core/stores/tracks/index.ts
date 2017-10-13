import { action, observable } from 'mobx'

import Track from 'core/models/track'
import clipStore from 'core/stores/clips'

class TrackStore {
  // The main store for tracks (by id)
  @observable tracks = observable.map<Track>({})

  // The main page list of recipe ids
  @observable trackList = observable.array<Track>([])

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.createTrack()
    }
  }

  getTrackById = (trackId: string) => {
    return this.tracks.get(trackId)
  }

  // Actions
  @action.bound
  createTrack = () => {
    const track = new Track()

    this.tracks.set(track.id, track)
    this.trackList.unshift(track)
  }

  @action.bound
  deleteTrack = (trackId: string) => {
    this.trackList.replace(this.trackList.filter(track => track.id !== trackId))

    clipStore.deleteClipsByTrackId(trackId)
    this.tracks.delete(trackId)
  }
}

export default new TrackStore()
export { TrackStore }
