import { Service } from 'typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { GridLayout } from 'core/layouts/sequencer/grid';
import { TimelineState } from 'core/state/sequencer/timeline';

@Service()
export class SequencerPositionService {
  constructor(private gridLayout: GridLayout, private timelineState: TimelineState) {}
  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { barWidth } = this.gridLayout;
    const nearestBar = Math.floor(offsetX / barWidth);
    return new TimelineVector(nearestBar);
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = this.gridLayout;
    const bar = position.bar * barWidth;
    const beats = position.beats.multiplyScalar(barWidth);

    return bar + beats;
  };

  getTimelineStart = () => {
    return new TimelineVector(0);
  };

  getTimelineEnd = () => {
    return new TimelineVector(this.timelineState.length);
  };
}
