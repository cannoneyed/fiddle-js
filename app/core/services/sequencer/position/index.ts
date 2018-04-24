import { Service } from 'typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { gridLayout } from 'core/layouts/sequencer/tracks/grid';

// TODO: Refactor the timeline system to be robust to time signature
// changes.
const TICKS_PER_BEAT = 240;

@Service()
export class SequencerPositionService {
  getTimelineVectorFromOffsetX = (offsetX: number) => {
    const { barWidth } = gridLayout;
    const nearestBar = Math.floor(offsetX / barWidth);
    return new TimelineVector(nearestBar);
  };

  getOffsetX = (position: TimelineVector) => {
    const { barWidth } = gridLayout;
    const bar = position.bar * barWidth;
    const beats = position.beats.multiplyScalar(barWidth);

    return bar + beats;
  };

  getTicks = (position: TimelineVector) => {
    const { bar, beats, ticks } = position;
    return (bar * 4 + beats.numerator) * TICKS_PER_BEAT + ticks;
  };

  getTimelineVectorFromTicks = (ticks: number) => {
    return new TimelineVector(0);
  };
}
