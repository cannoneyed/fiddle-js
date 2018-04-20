import { Container } from 'typedi';
import { Clip } from 'core/models/clip';

import { ClipMoveService } from 'core/services/sequencer/clip-move';
import { ClipDragInteraction, DRAG_DELAY } from 'core/interactions/clip/drag';
import { ClipSelect } from 'core/interactions/clip/select';

export const register = (clip: Clip, mouseDown: React.MouseEvent<HTMLElement>) => {
  const clipDragInteraction = Container.get(ClipDragInteraction);
  const clipMoveService = Container.get(ClipMoveService);
  const clipSelect = Container.get(ClipSelect);

  const startX = mouseDown.pageX;
  const startY = mouseDown.pageY;
  const begin = Date.now();

  clipDragInteraction.setStartPosition(startX, startY);

  const mouseMove = (mouseMove: MouseEvent): void => {
    if (Date.now() < begin + DRAG_DELAY) {
      return;
    }
    if (!clipDragInteraction.isDragging) {
      clipDragInteraction.beginDrag(clip);
    }

    const deltaX = mouseMove.pageX - clipDragInteraction.startX;
    const deltaY = mouseMove.pageY - clipDragInteraction.startY;
    clipDragInteraction.setDelta(deltaX, deltaY);
  };

  const mouseUp = (mouseUp: MouseEvent): void => {
    if (Date.now() >= begin + DRAG_DELAY && clipDragInteraction.isDragging) {
      endDrag();
    }
    removeEventHandlers();
  };

  const removeEventHandlers = () => {
    window.removeEventListener('mouseup', mouseUp);
    window.removeEventListener('mousemove', mouseMove);
  };

  const addEventHandlers = () => {
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mousemove', mouseMove);
  };

  addEventHandlers();

  function endDrag() {
    const { handleClip, dropTargetPosition } = clipDragInteraction;
    if (dropTargetPosition) {
      const { selectedClips } = clipSelect;
      const deltaTimeline = dropTargetPosition.subtract(handleClip.position);
      clipMoveService.moveClips(selectedClips, deltaTimeline);
    }
    clipDragInteraction.endDrag();
  }
};
