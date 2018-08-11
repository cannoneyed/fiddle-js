import { Service } from 'typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Track } from 'core/models/Track';
import { ClipSelectInteraction } from 'core/interactions//clip/select';

@Service()
export class TracksMouseInteraction {
  static mobxLoggerConfig = filterMethods('handleMouseEnter', 'handleMouseLeave');

  constructor(private clipSelect: ClipSelectInteraction) {}

  @action
  handleTrackClick = (track: Track, event: MouseEvent) => {
    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };

  @action
  handleStageClick = (event: MouseEvent) => {
    if (event.ctrlKey) {
      // no op
    } else if (this.clipSelect.selectedClips.length > 0) {
      this.clipSelect.deselectAllClips();
    }
  };
}
