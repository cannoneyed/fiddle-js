import { action } from 'mobx'

import clipSelect from 'core/interactions/clips/select'

class TrackMouse {
  @action.bound handleTrackClick = (track, event) => {
    event.stopPropagation()

    if (event.ctrlKey) {
      // no op
    } else if (clipSelect.selectedClips.length > 0) {
      clipSelect.deselectAllClips()
    }
  }
}

export default new TrackMouse()
