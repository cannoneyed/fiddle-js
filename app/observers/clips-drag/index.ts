import { autorun, IReactionDisposer } from 'mobx'

import snapToGridService from 'core/services/sequencer/snap-to-grid'
import tracksPositionService from 'core/services/sequencer/position/tracks'

import clipDragInteraction from 'core/stores/interactions/clips/drag'
import { moveDraggedClips } from 'dom/drag-clips'

export default function observeClipsDrag(): IReactionDisposer {
  return autorun(() => {
    const { isDragging } = clipDragInteraction
    if (isDragging) {
      const { x, y } = clipDragInteraction.draggedClipsPosition
      moveDraggedClips(x, y)

      const offsetX = tracksPositionService.getOffsetXFromScreenX(x)
      const snapToGridPosition = snapToGridService.getNearestSnapPosition(offsetX)
      clipDragInteraction.setDropTargetPosition(snapToGridPosition)
    }
  })
}
