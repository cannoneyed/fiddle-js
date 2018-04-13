import { sequencerDOM } from 'core/dom/sequencer';
import { sequencerView } from 'core/stores/sequencer/view';

import { getNextScrollPercentX } from './helpers';

export type UnregisterHandlers = () => void;
export type EventHandler = (event: WheelEvent) => void;

export const registerHandlers = (): UnregisterHandlers => {
  const { minimap } = sequencerDOM;

  if (!minimap) {
    return () => {};
  }

  const eventHandler = (event: WheelEvent) => {
    event.preventDefault();
    const { deltaX } = event;

    const nextScrollPercentX = getNextScrollPercentX(deltaX);
    sequencerView.tracks.setTracksScroll({ x: nextScrollPercentX });
  };
  minimap.addEventListener('mousewheel', eventHandler);

  return function unregisterHandlers(): void {
    minimap.removeEventListener('mousewheel', eventHandler);
  };
};
