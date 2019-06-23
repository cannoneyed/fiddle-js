import { Inject, Service } from 'libs/typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { SequencerState, TimelineState } from 'features/Sequencer/core';
import { GridService } from 'core';

@Service()
export default class SequencerPositionService {
  @Inject(_ => TimelineState)
  private timelineState: TimelineState;

  @Inject(_ => GridService)
  private gridService: GridService;

  @Inject(_ => SequencerState)
  private sequencerState: SequencerState;

  private getTimeline() {
    return this.timelineState.timeline;
  }

  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { snapToGrid } = this.sequencerState;
    const timeline = this.getTimeline();

    const snapToGridPosition = this.gridService.getNearestSnapPosition(
      timeline,
      offsetX,
      snapToGrid
    );
    return snapToGridPosition;
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = this.getTimeline();
    const barsX = position.bars * barWidth;
    const beatsX = position.getFractionAfterBar().multiplyScalar(barWidth);
    return barsX + beatsX;
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
