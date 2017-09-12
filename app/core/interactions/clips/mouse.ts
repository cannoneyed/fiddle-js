import { action } from 'mobx'

import Clip from 'core/models/clip'
import clipSelect from 'core/interactions/clips/select'
import clipDrag from 'core/interactions/clips/drag'

class ClipMouseInteraction {
  @action.bound
  handleClipMouseDown = (clip: Clip, event: React.MouseEvent<HTMLElement>) => {
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

export default new ClipMouseInteraction()
export { ClipMouseInteraction }
