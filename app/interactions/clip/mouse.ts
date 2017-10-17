import Clip from 'core/models/clip'
import clipSelect from 'core/interactions/clips/select'

import { registerClipDragHandlers } from './drag'

export function handleClipMouseDown(clip: Clip, event: React.MouseEvent<HTMLElement>) {
  event.stopPropagation()

  // If left-click, do nothing (delegate to context menus)
  if (event.ctrlKey) {
    return
  } else if (clip.isSelected) {
    // no op, still set up handlers below
  } else if (event.shiftKey) {
    clipSelect.selectClip(clip)
  } else {
    clipSelect.selectOnlyClip(clip)
  }

  event.stopPropagation()
  event.preventDefault()
  registerClipDragHandlers(clip, event)
}
