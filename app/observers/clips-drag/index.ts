import { autorun, IReactionDisposer } from 'mobx'

import snapToGridService from 'core/services/sequencer/snap-to-grid'
import tracksPositionService from 'core/services/sequencer/position/tracks'

import clipDragInteraction from 'core/interactions/clips/drag'
import { moveDraggedClips } from 'dom/drag-clips'

import timelineView from 'core/stores/sequencer/view/timeline'

export default function observeClipsDrag(): IReactionDisposer {
  return autorun(() => {
    const { isDragging } = clipDragInteraction
    if (isDragging) {
      const { x, y } = clipDragInteraction.draggedClipsPosition
      moveDraggedClips(x, y)

      const offsetX = tracksPositionService.getOffsetXFromScreenX(x)
      const snapToGridPosition = snapToGridService.getNearestSnapPosition(offsetX)
      timelineView.setDragToMarkerPosition(snapToGridPosition)
    }
  })
}
