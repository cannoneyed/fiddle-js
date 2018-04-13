import { Clip } from 'core/models/clip';

import { clipMoveService } from 'core/services/sequencer/clip-move';

import { clipDrag, DRAG_DELAY } from 'core/interactions/clip/drag';
import { clipSelect } from 'core/interactions/clip/select';

export const registerClipDragHandlers = (clip: Clip, mouseDown: React.MouseEvent<HTMLElement>) => {
  const startX = mouseDown.pageX;
  const startY = mouseDown.pageY;
  const begin = Date.now();

  clipDrag.setStartPosition(startX, startY);

  const mouseMove = (mouseMove: MouseEvent): void => {
    if (Date.now() < begin + DRAG_DELAY) {
      return;
    }
    if (!clipDrag.isDragging) {
      clipDrag.beginDrag(clip);
    }

    const deltaX = mouseMove.pageX - clipDrag.startX;
    const deltaY = mouseMove.pageY - clipDrag.startY;
    clipDrag.setDelta(deltaX, deltaY);
  };

  const mouseUp = (mouseUp: MouseEvent): void => {
    if (Date.now() >= begin + DRAG_DELAY && clipDrag.isDragging) {
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
};

function endDrag() {
  const { handleClip, dropTargetPosition } = clipDrag;
  if (dropTargetPosition) {
    const { selectedClips } = clipSelect;
    const deltaTimeline = dropTargetPosition.subtract(handleClip.position);
    clipMoveService.moveClips(selectedClips, deltaTimeline);
  }
  clipDrag.endDrag();
}
