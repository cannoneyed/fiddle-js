import { action } from 'mobx'

import clipSelect from 'core/interactions/clips/select'
import clipDrag from 'core/interactions/clips/drag'

class ClipMouse {
  @action.bound handleClipMouseDown = (clip, event) => {
    event.stopPropagation()

    // If left-click, do nothing (delegate to context menus)
    if (event.ctrlKey) {
      return
    } else if (clip.isSelected) {
      // no op, still set up handlers below
    } else if (event.shiftKey) {
      clipSelect.addSelectedClip(clip)
    } else {
      clipSelect.selectClip(clip)
    }

    // Set up drag handlers (outside of drag action to cut down logging)
    clipDrag.setupDragHandlers()
  }
}

export default new ClipMouse()
