import { action, computed, observable } from 'mobx'

class SequencerInteraction {
  @observable selectedClips = observable.map({})
  @observable draggedClip = null

  @observable selectedTracks = observable.map({})
  @observable draggedTrack = null

  // The current selection target (either a map of clips or tracks)
  @observable selectionTarget = null

  @computed get nSelectedClips() {
    return this.selectedClips.size
  }

  @action.bound handleClipClick = (clip, event) => {
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

  @action.bound handleTrackClick = (track, event) => {
    event.stopPropagation()

    if (event.ctrlKey) {
      // no op
    } else if (this.selectionTarget === this.selectedClips) {
      this.deselectAllClips()
      this.selectionTarget = null
    }
  }

  // ------------------------------ Clips
  // Selects a single clip, removing previously selected
  @action selectClip = (clip) => {
    this.deselectAllClips()
    clip.selected = true
    this.selectedClips.set(clip.id, clip)
  }

  // Adds a clip to a group of selected clips
  @action addSelectedClip = (clip) => {
    clip.selected = true
    this.selectedClips.set(clip.id, clip)
  }

  // Deselects a single clip
  @action deselectClip = (clip) => {
    if (this.selectedClips.has(clip.id)) {
      clip.selected = false
      this.selectedClips.delete(clip.id)
    }
  }

  // Deselects all clips
  @action deselectAllClips = () => {
    this.selectedClips.forEach(clip => clip.selected = false)
    this.selectedClips.clear()
  }

  // ------------------------------ Tracks
  // Selects a single track, removing previously selected
  @action selectTrack = (track) => {
    this.selectedTracks.clear()
    this.selectedTracks.set(track.id, track)
  }
  // Adds a track to a group of selected tracks
  @action addSelectedTrack = (track) => {
    this.selectedTracks.set(track.id, track)
  }

  // Deselects a single track
  @action deselectTrack = (track) => {
    if (this.selectedTracks.has(track.id)) {
      this.selectedTracks.delete(track.id)
    }
  }

  // Deselects all tracks
  @action.bound deselectAllTracks = () => {
    this.selectedTracks.clear()
  }
}

export default new SequencerInteraction()
export { SequencerInteraction }
