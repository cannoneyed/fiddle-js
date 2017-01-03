import { action, map, observable } from 'mobx'
import autobind from 'autobind-decorator'
import Track from './track'

@autobind
class TracksStore {
  // The main store for tracks (by id)
  @observable trackMap = map({})

  // The main page list of recipe ids
  @observable trackList = []

  @action
  createTrack = () => {
    const track = new Track()

    this.trackMap.set(track.id, track)
    this.trackList.unshift(track)
  }
}

const tracksStore = new TracksStore()

export default tracksStore
export { TracksStore }
