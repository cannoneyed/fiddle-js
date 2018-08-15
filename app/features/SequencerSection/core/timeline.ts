import { Service } from 'typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

// import { ClipDragInteraction } from 'features/SequencerSection/core/interactions/clip-drag';
// import { get } from 'features/SequencerSection/core';

@Service()
export class Timeline {
  // private clipDragInteraction = get(ClipDragInteraction);

  @computed
  get dropTargetPosition() {
    // console.log(this.clipDragInteraction);
    return null;
    //   return this.clipDragInteraction.isDragging
    //     ? this.clipDragInteraction.dropTargetTimelinePosition
    //     : null;
  }

  @computed
  get dropTargetTrackIndex() {
    return null;
    //   return this.clipDragInteraction.isDragging
    //     ? this.clipDragInteraction.dropTargetTrackIndex
    //     : null;
  }

  length = new TimelineVector(64);
}
