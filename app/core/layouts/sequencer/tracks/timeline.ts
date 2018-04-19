import { Service } from 'typedi';
import { computed } from 'mobx';

import { clipDragInteraction } from 'core/interactions/clip/drag';

@Service()
export class TimelineLayout {
  @computed
  get dropTargetPosition() {
    return clipDragInteraction.isDragging ? clipDragInteraction.dropTargetPosition : null;
  }
}
