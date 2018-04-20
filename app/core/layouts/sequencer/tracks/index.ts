import { Inject, Service } from 'typedi';

import { GridLayout } from './grid';
import { TimelineLayout } from './timeline';
import { TracksLayout } from './tracks';
import { ZoomLayout } from './zoom';

@Service()
export class TracksSectionLayout {
  @Inject(type => GridLayout) grid: GridLayout
  @Inject(type => TimelineLayout) timeline: TimelineLayout
  @Inject(type => TracksLayout) tracks: TracksLayout
  @Inject(type => ZoomLayout) zoom: ZoomLayout
}
