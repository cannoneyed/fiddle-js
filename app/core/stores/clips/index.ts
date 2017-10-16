import { action, observable } from 'mobx'

import Clip from 'core/models/clip'

import sequencerPosition from 'core/stores/sequencer/position'
import clipSelect from 'core/interactions/clips/select'

interface ICreateClip {
  trackId: string
  offsetX: number
}

class ClipStore {
  // The main store for clips (by id)
  @observable clips = observable.map<Clip>({})

  constructor() {
    this.createClip({
      trackId: '20',
      offsetX: 4,
    })
  }

  // Actions
  @action.bound
  createClip = (params: ICreateClip) => {
    const { trackId, offsetX } = params
    const position = sequencerPosition.getPositionFromOffset(offsetX)
    const clip = new Clip({ trackId, position })
    this.clips.set(clip.id, clip)
  }

  @action.bound
  deleteClip = (clipId: string) => {
    this.clips.delete(clipId)
  }

  @action.bound
  deleteSelectedClips = () => {
    clipSelect.selectedClips.forEach((clip: Clip) => {
      this.clips.delete(clip.id)
    })
  }

  @action.bound
  deleteClipsByTrackId = (trackId: string) => {
    this.clips.forEach((clip: Clip, clipId) => {
      if (clip.trackId === trackId) {
        this.clips.delete(clipId)
      }
    })
  }
}

export default new ClipStore()
export { ClipStore }
