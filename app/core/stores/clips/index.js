import { action, observable } from 'mobx'

import Clip from 'core/models/clip'

import sequencerPosition from 'core/stores/sequencer/position'
import sequencerInteraction from 'core/stores/sequencer/interaction'

class ClipsStore {
  // The main store for clips (by id)
  @observable clips = observable.map({})

  // Actions
  @action.bound
  createClip = ({ trackId, offsetX }) => {
    const position = sequencerPosition.getPositionFromOffset(offsetX)
    const clip = new Clip({ trackId, position })
    this.clips.set(clip.id, clip)
  }

  @action.bound
  deleteClip = (clipId) => {
    this.clips.delete(clipId)
  }

  @action.bound
  deleteSelectedClips = () => {
    sequencerInteraction.selectedClips.forEach(clip => {
      this.clips.delete(clip.id)
    })
  }

  @action.bound
  deleteClipsByTrackId = (trackId) => {
    this.clips.forEach((clip, clipId) => {
      if (clip.trackId === trackId) {
        this.clips.delete(clipId)
      }
    })
  }
}

export default new ClipsStore()
export { ClipsStore }
