import { sequencerDOM } from 'core/dom/sequencer';
import { sequencerView } from 'core/stores/sequencer/view';
import { minimapDragInteraction } from 'core/interactions/minimap/drag';

import { getNextScrollPercentX } from '../helpers';

export type Unregister = () => void;
export type EventHandler = (event: MouseEvent) => void;

export const register = (): Unregister => {
  const { minimap, minimapScroll } = sequencerDOM;
  let mouseDown: EventHandler;

  if (minimap && minimapScroll) {
    mouseDown = (mouseDown: MouseEvent) => {
      let lastX = mouseDown.pageX;
      minimapDragInteraction.setIsDragging(true);

      function mouseMove(mouseMove: MouseEvent): void {
        if (!minimap || !minimapScroll) {
          return;
        }
        const deltaX = mouseMove.pageX - lastX;
        lastX = mouseMove.pageX;

        const nextScrollPercentX = getNextScrollPercentX(deltaX);
        sequencerView.tracks.setTracksScroll({ x: nextScrollPercentX });
      }

      function mouseUp(mouseUp: MouseEvent): void {
        minimapDragInteraction.setIsDragging(false);
        removeEventHandlers();
      }

      function removeEventHandlers() {
        window.removeEventListener('mouseup', mouseUp);
        window.removeEventListener('mousemove', mouseMove);
      }

      function addEventHandlers() {
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', mouseMove);
      }

      mouseDown.stopPropagation();
      mouseDown.preventDefault();
      addEventHandlers();
    };

    minimapScroll.addEventListener('mousedown', mouseDown);
  }

  return function unregisterHandlers(): void {
    if (minimap && minimapScroll) {
      minimapScroll.removeEventListener('mousedown', mouseDown);
    }
  };
};
