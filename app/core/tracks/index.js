import { action, observable } from 'mobx'
import Track from './track'

class TracksStore {
  // The main store for tracks (by id)
  @observable trackMap = observable.map({})

  // The main page list of recipe ids
  @observable trackList = []

  @action.bound
  createTrack = () => {
    const track = new Track()

    this.trackMap.set(track.id, track)
    this.trackList.unshift(track)
  }
}

const tracksStore = new TracksStore()

export default tracksStore
export { TracksStore }
