import { autorun, IReactionDisposer } from 'mobx'

import { gridService } from 'core/services/sequencer/grid'
import { tracksPositionService } from 'core/services/sequencer/position/tracks'

import { clipDrag } from 'core/stores/interactions/clips/drag'
import { moveDraggedClips } from 'dom/drag-clips'

export const observeClipsDrag = (): IReactionDisposer => {
  return autorun(() => {
    const { isDragging } = clipDrag
    if (isDragging) {
      const { x, y } = clipDrag.draggedClipsPosition
      moveDraggedClips(x, y)

      const offsetX = tracksPositionService.getOffsetXFromScreenX(x)
      const snapToGridPosition = gridService.getNearestSnapPosition(offsetX)
      clipDrag.setDropTargetPosition(snapToGridPosition)
    }
  })
}
