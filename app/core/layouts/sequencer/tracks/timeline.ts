import { computed } from 'mobx';

import { clipDragInteraction } from 'core/interactions/clip/drag';

export class TimelineLayout {
  @computed
  get dropTargetPosition() {
    return clipDragInteraction.isDragging ? clipDragInteraction.dropTargetPosition : null;
  }
}

export const timelineLayout = new TimelineLayout();
