import { Inject, Service } from 'libs/typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { TimelineState } from 'features/Sequencer/core';

@Service()
export default class __SequencerPositionService {
  @Inject(_ => TimelineState)
  private timelineState: TimelineState;

  private getTimeline() {
    return this.timelineState.timeline;
  }

  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { barWidth } = this.getTimeline();
    const nearestBar = Math.floor(offsetX / barWidth);
    return new TimelineVector(nearestBar);
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = this.getTimeline();
    const bar = position.bars * barWidth;
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
    const timeline = this.getTimeline();
    return new TimelineVector(timeline.length.bars);
  };
}
