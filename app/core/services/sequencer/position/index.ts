import { Service } from 'typedi';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { gridLayout } from 'core/layouts/sequencer/tracks/grid';

@Service()
export class SequencerPositionService {
  getTimelineVector = (offsetX: number) => {
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
}
