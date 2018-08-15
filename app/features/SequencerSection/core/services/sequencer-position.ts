import { Service } from 'typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { GridLayout } from 'features/SequencerSection/core/grid';
import { Timeline } from 'features/SequencerSection/core/timeline';

@Service()
export class SequencerPositionService {
  constructor(private gridLayout: GridLayout, private timeline: Timeline) {}

  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { barWidth } = this.gridLayout;
    const nearestBar = Math.floor(offsetX / barWidth);
    return new TimelineVector(nearestBar);
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = this.gridLayout;
    const bar = position.primary * barWidth;
    const beats = position.beats.multiplyScalar(barWidth);

    return bar + beats;
  };

  getWidth = (length: TimelineVector): number => {
    return this.getOffsetX(length);
  };

  getTimelineStart = () => {
    return new TimelineVector(0);
  };

  getTimelineEnd = () => {
    return new TimelineVector(this.timeline.length.primary);
  };
}
