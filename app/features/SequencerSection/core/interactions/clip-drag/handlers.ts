import { Clip } from 'core/models/clip';

import { DRAG_DELAY } from './index';
import { get, ClipDragInteraction } from 'features/SequencerSection/core';

export const register = (clip: Clip, mouseDown: MouseEvent) => {
  const clipDragInteraction = get(ClipDragInteraction);

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

  const mouseUp = (): void => {
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
    clipDragInteraction.endDrag();
  }
};
