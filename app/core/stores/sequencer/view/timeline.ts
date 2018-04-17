import { computed } from 'mobx';

import { clipDragInteraction } from 'core/interactions/clip/drag';

export class TimelineView {
  @computed
  get dropTargetPosition() {
    return clipDragInteraction.isDragging ? clipDragInteraction.dropTargetPosition : null;
  }
}

export const timelineView = new TimelineView();
