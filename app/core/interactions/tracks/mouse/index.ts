import { Service } from 'typedi';
import { action, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Track } from 'core/models/Track';
import { ClipSelect } from 'core/interactions/clip/select';

@Service()
export class TracksMouseInteraction {
  static mobxLoggerConfig = filterMethods('handleMouseEnter', 'handleMouseLeave');

  constructor(private clipSelect: ClipSelect) {}

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
    track.setIsMouseOver(true);
  };

  @action
  handleMouseLeave = (track: Track, event: React.MouseEvent<HTMLElement>) => {
    track.setIsMouseOver(false);
  };
}
