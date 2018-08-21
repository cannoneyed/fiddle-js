import { Inject, Service } from 'libs/typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipDragInteraction } from 'features/Sequencer/core';

@Service()
export default class __Timeline {
  @Inject(type => ClipDragInteraction)
  clipDragInteraction: ClipDragInteraction;

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
