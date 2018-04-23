import { Container } from 'typedi';
import { action, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Track } from 'core/models/Track';
import { ClipSelect } from 'core/interactions/clip/select';

export class TrackMouseInteraction {
  static mobxLoggerConfig = filterMethods('handleMouseEnter', 'handleMouseLeave');

  clipSelect = Container.get(ClipSelect);

  @observable trackMouseOver: Track | null;

  @action
  handleTrackClick = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };

  @action
  handleMouseEnter = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    console.log('enter track', track.id);
    track.setIsMouseOver(true);
  };

  @action
  handleMouseLeave = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    console.log('exit track', track.id);
    track.setIsMouseOver(false);
  };
}

export const trackMouseInteraction = new TrackMouseInteraction();
