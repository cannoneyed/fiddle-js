import { action, observable } from 'mobx'
import Clip from './clip'
import trackStore from '../tracks'

class ClipsStore {
  // The main store for clips (by id)
  @observable clipMap = observable.map({})

  // Actions
  @action.bound
  createClip = ({ trackId, position }) => {
    const clip = new Clip({ trackId, position })

    this.clipMap.set(clip.id, clip)
    const track = trackStore.getTrackById(trackId)
    track.addClip(clip)
  }

  @action.bound
  deleteClip = (clipId) => {
    const { trackId } = this.clipMap.get(clipId)
    // Delete from the track
    const track = trackStore.getTrackById(trackId)
    track.removeClip(clipId)

    this.clipMap.delete(clipId)
  }

  @action.bound
  deleteClipsByTrackId = (trackId) => {
    this.clipMap.forEach((clip, clipId) => {
      if (clip.trackId === trackId) {
        this.clipMap.delete(clipId)
      }
    })
  }
}

export default new ClipsStore()
export { ClipsStore }
