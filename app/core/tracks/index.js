import { action, observable } from 'mobx'
import Track from './track'
import clipStore from 'core/clips'

class TrackStore {
  // The main store for tracks (by id)
  @observable trackMap = observable.map({})

  // The main page list of recipe ids
  @observable trackList = []

  getTrackById = (trackId) => {
    return this.trackMap.get(trackId)
  }

  // Actions
  @action.bound
  createTrack = () => {
    const track = new Track()

    this.trackMap.set(track.id, track)
    this.trackList.unshift(track)
  }

  @action.bound
  deleteTrack = (trackId) => {
    this.trackList = this.trackList.filter(track => track.id !== trackId)

    clipStore.deleteClipsByTrackId(trackId)
    this.trackMap.delete(trackId)
  }
}

export default new TrackStore()
export { TrackStore }
