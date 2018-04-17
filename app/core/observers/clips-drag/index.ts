import { autorun, IReactionDisposer } from 'mobx';

import { gridService } from 'core/services/sequencer/grid';
import { tracksPositionService } from 'core/services/sequencer/position/tracks';

import { clipDragInteraction } from 'core/interactions/clip/drag';
import { moveDraggedClips } from 'core/dom/drag-clips';

export const observeClipsDrag = (): IReactionDisposer => {
  return autorun(() => {
    const { isDragging } = clipDragInteraction;
    if (isDragging) {
      const { x, y } = clipDragInteraction.draggedClipsPosition;
      moveDraggedClips(x, y);

      const offsetX = tracksPositionService.getOffsetXFromScreenX(x);
      const snapToGridPosition = gridService.getNearestSnapPosition(offsetX);
      clipDragInteraction.setDropTargetPosition(snapToGridPosition);
    }
  });
};
