import { Container, Service } from 'typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipDragInteraction } from 'core/interactions/clip/drag';

@Service()
export class Timeline {
  private clipDragInteraction = Container.get(ClipDragInteraction);

  @computed
  get dropTargetPosition() {
    return this.clipDragInteraction.isDragging
      ? this.clipDragInteraction.dropTargetTimelinePosition
      : null;
  }

  @computed
  get dropTargetTrackIndex() {
    return this.clipDragInteraction.isDragging
      ? this.clipDragInteraction.dropTargetTrackIndex
      : null;
  }

  length = new TimelineVector(64);
}
