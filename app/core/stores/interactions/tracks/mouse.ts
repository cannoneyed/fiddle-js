import { action } from 'mobx'

import Track from 'core/models/Track'
import clipSelect from 'core/stores/interactions/clips/select'

class TrackMouseInteraction {
  @action.bound
  handleTrackClick = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()

    if (event.ctrlKey) {
      // no op
    } else if (clipSelect.selectedClips.length > 0) {
      clipSelect.deselectAllClips()
    }
  }
}

export default new TrackMouseInteraction()
export { TrackMouseInteraction }
