import { action } from 'mobx'

import clipSelect from 'core/interactions/clips/select'
import clipDrag from 'core/interactions/clips/drag'

class ClipMouse {
  @action.bound handleClipMouseDown = (clip, event) => {
    event.stopPropagation()

    if (event.ctrlKey) {
      return
    } else if (event.shiftKey) {
      clipSelect.addSelectedClip(clip)
    } else {
      clipSelect.selectClip(clip)
    }

    // Begin setting up drag handlers
    clipDrag.setupDragHandlers()
  }
}

export default new ClipMouse()
