import { action, computed, observable } from 'mobx'

import clipStore from 'core/stores/clips'

class SequencerInteraction {
  @observable draggedClip = null

  @computed get selectedClips() {
    return clipStore.clips.values().filter(clip => clip.selected)
  }

  @action.bound handleClipMouseDown = (clip, event) => {
    event.stopPropagation()

    this.selectionTarget = this.selectedClips

    if (event.ctrlKey) {
      // no op
    } else if (event.shiftKey) {
      this.addSelectedClip(clip)
    } else {
      this.selectClip(clip)
    }
  }

  @action.bound handleClipMouseUp = (clip, event) => {
    console.log('🐸', 'mouse up!', event)
  }

  @action.bound handleTrackClick = (track, event) => {
    event.stopPropagation()

    if (event.ctrlKey) {
      // no op
    } else if (this.selectedClips.length > 0) {
      this.deselectAllClips()
    }
  }

  // ------------------------------ Clips
  // Selects a single clip, removing previously selected
  @action selectClip = (clip) => {
    this.selectedClips.forEach(selectedClip => selectedClip.selected = false)
    clip.selected = true
  }

  // Adds a clip to a group of selected clips
  @action addSelectedClip = (clip) => {
    clip.selected = true
  }

  // Deselects a single clip
  @action deselectClip = (clip) => {
    clip.selected = false
  }

  // Deselects all clips
  @action deselectAllClips = () => {
    this.selectedClips.forEach(clip => {
      clip.selected = false
    })
  }
}

export default new SequencerInteraction()
export { SequencerInteraction }
