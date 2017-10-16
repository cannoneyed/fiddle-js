import { autorun } from 'mobx'

import clipDragInteraction from 'core/interactions/clips/drag'
import { moveDraggedClips } from 'dom/drag-clips'

export default function observeClipsDrag(): void {
  autorun(() => {
    const { isDragging, deltaX, deltaY } = clipDragInteraction
    if (isDragging) {
      moveDraggedClips(deltaX, deltaY)
    }
  })
}
