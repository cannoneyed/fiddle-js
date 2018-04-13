import { sequencerDOM } from 'core/dom/sequencer';

export const moveDraggedClips = (x: number, y: number) => {
  const draggedClipsContainer = sequencerDOM.draggedClips;
  if (!draggedClipsContainer) {
    return;
  }

  draggedClipsContainer.style.left = `${x}px`;
  draggedClipsContainer.style.top = `${y}px`;
};
