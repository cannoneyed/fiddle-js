import { action, computed } from 'mobx'

import clipStore from 'core/stores/clips'

class ClipSelect {
  @computed get selectedClips() {
    return clipStore.clips.values().filter(clip => clip.isSelected)
  }

  // Selects a single clip, removing previously selected
  @action selectClip = (clip) => {
    this.selectedClips.forEach(selectedClip => selectedClip.selected = false)
    clip.isSelected = true
  }

  // Adds a clip to a group of selected clips
  @action addSelectedClip = (clip) => {
    clip.isSelected = true
  }

  // Deselects a single clip
  @action deselectClip = (clip) => {
    clip.isSelected = false
  }

  // Deselects all clips
  @action deselectAllClips = () => {
    this.selectedClips.forEach(clip => {
      clip.isSelected = false
    })
  }
}

export default new ClipSelect()
