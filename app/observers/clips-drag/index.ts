import { autorun, IReactionDisposer } from 'mobx'

import gridService from 'core/services/sequencer/grid'
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
      const snapToGridPosition = gridService.getNearestSnapPosition(offsetX)
      clipDragInteraction.setDropTargetPosition(snapToGridPosition)
    }
  })
}
