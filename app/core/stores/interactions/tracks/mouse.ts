import { action } from 'mobx';

import { Track } from 'core/models/Track';
import { clipSelect } from 'core/interactions/clip/select';

export class TrackMouseInteraction {
  @action.bound
  handleTrackClick = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      // no op
    } else if (clipSelect.selectedClips.length > 0) {
      clipSelect.deselectAllClips();
    }
  };
}

export const trackMouseInteraction = new TrackMouseInteraction();
