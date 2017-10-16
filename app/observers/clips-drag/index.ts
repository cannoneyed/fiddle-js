import { autorun, IReactionDisposer } from 'mobx'

import clipDragInteraction from 'core/interactions/clips/drag'
import { moveDraggedClips } from 'dom/drag-clips'

export default function observeClipsDrag(): IReactionDisposer {
  return autorun(() => {
    const { isDragging } = clipDragInteraction
    if (isDragging) {
      const { draggedClipsPosition } = clipDragInteraction
      moveDraggedClips(draggedClipsPosition.x, draggedClipsPosition.y)
    }
  })
}
