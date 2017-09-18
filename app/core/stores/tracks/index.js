import { action, observable } from 'mobx'

import Track from 'core/models/track'
import clipStore from 'core/stores/clips'

class TrackStore {
  // The main store for tracks (by id)
  @observable tracks = observable.map({})

  // The main page list of recipe ids
  @observable trackList = []

  getTrackById = (trackId) => {
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
  deleteTrack = (trackId) => {
    this.trackList = this.trackList.filter(track => track.id !== trackId)

    clipStore.deleteClipsByTrackId(trackId)
    this.tracks.delete(trackId)
  }
}

export default new TrackStore()
export { TrackStore }
