import { Container } from 'typedi';
import { autorun, IReactionDisposer } from 'mobx';

import { gridService } from 'core/services/sequencer/grid';
import { tracksPositionService } from 'core/services/sequencer/position/tracks';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { moveDraggedClips } from 'core/dom/drag-clips';

export const observeClipsDrag = (): IReactionDisposer => {
  const clipDragInteraction = Container.get(ClipDragInteraction);

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
