import { computed } from 'mobx';

import { clipDrag } from 'core/interactions/clip/drag';

export class TimelineView {
  @computed
  get dropTargetPosition() {
    return clipDrag.isDragging ? clipDrag.dropTargetPosition : null;
  }
}

export const timelineView = new TimelineView();
