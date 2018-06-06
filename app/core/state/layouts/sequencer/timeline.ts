import { Inject, Service } from 'typedi';
import { computed } from 'mobx';

import { ClipDragInteraction } from 'core/interactions//clip/drag';

@Service()
export class TimelineLayout {
  @Inject(type => ClipDragInteraction)
  clipDragInteraction: ClipDragInteraction;

  @computed
  get dropTargetPosition() {
    return this.clipDragInteraction.isDragging
      ? this.clipDragInteraction.dropTargetTimelinePosition
      : null;
  }
}
