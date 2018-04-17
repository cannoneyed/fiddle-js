import { map } from 'lodash';

import { sequencerDOM } from 'core/dom/sequencer';
import { sequencerView } from 'core/stores/sequencer/view';

export type Unregister = () => void;
export type EventHandler = (event: WheelEvent) => void;

export const register = (): Unregister => {
  const { xy, x, y } = sequencerDOM.getTrackScrollElements();
  const eventHandlers = new WeakMap<HTMLElement, EventHandler>();

  map([xy, x, y], group => {
    map(group, element => {
      let canScrollX = false;
      let canScrollY = false;

      if (group === xy) {
        canScrollX = canScrollY = true;
      } else if (group === x) {
        canScrollX = true;
      } else if (group === y) {
        canScrollY = true;
      }

      const syn = (event: WheelEvent) => {
        const { deltaX, deltaY } = event;

        const { scrollLeft, scrollTop } = element;
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = element;

        const scrollX = canScrollX ? scrollLeft + deltaX : scrollLeft;
        const scrollY = canScrollY ? scrollTop + deltaY : scrollTop;

        const ratioX = canScrollX ? scrollX / (scrollWidth - clientWidth) : undefined;
        const ratioY = canScrollY ? scrollY / (scrollHeight - clientHeight) : undefined;

        // Set the scroll amount in the mobx sequencer view store (for reactive elements) as well as imperatively
        // scrolling the scroll areas
        sequencerView.tracks.setTracksScroll({ x: ratioX, y: ratioY });
      };

      element.addEventListener('mousewheel', syn, { passive: true });
      eventHandlers.set(element, syn);
    });
  });

  return function unregisterHandlers(): void {
    map([xy, x, y], group => {
      map(group, element => {
        const syn = eventHandlers.get(element)!;
        element.removeEventListener('mousewheel', syn);
        eventHandlers.delete(element);
      });
    });
  };
};
