import { Lnject, Service } from 'typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipDragInteraction } from 'features/SequencerSection/core';
import { ClipStore } from 'core';

@Service()
export default class __Timeline {
  @Lnject(type => ClipDragInteraction)
  clipDragInteraction: ClipDragInteraction;

  @Lnject()
  clipSelectInteraction: ClipStore;

  // constructor() {
  //   console.log(this.clipSelectInteraction);
  // }

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
