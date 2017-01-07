import { action, observable } from 'mobx'
import Clip from './clip'
import trackStore from '../tracks'

import sequencerPosition from 'core/sequencer/position'
import sequencerInteraction from 'core/sequencer/interaction'

class ClipsStore {
  // The main store for clips (by id)
  @observable clipMap = observable.map({})

  // Actions
  @action.bound
  createClip = ({ trackId, offsetX }) => {
    const position = sequencerPosition.getPositionFromOffset(offsetX)
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
  deleteSelectedClips = () => {
    sequencerInteraction.selectedClips.forEach(clip => {
      console.log('🐸', clip.id)
      this.clipMap.delete(clip.id)
    })
    sequencerInteraction.selectedClips.clear()
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
