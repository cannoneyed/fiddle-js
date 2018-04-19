import { Container } from 'typedi';
import { action } from 'mobx';

import { Track } from 'core/models/Track';
import { ClipSelect } from 'core/interactions/clip/select';

export class TrackMouseInteraction {
  clipSelect = Container.get(ClipSelect);

  @action.bound
  handleTrackClick = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };
}

export const trackMouseInteraction = new TrackMouseInteraction();
