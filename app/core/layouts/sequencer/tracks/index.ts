import { Container, Service } from 'typedi';

import { GridLayout } from './grid';
import { TimelineLayout } from './timeline';
import { TracksLayout } from './tracks';
import { ZoomLayout } from './zoom';

@Service()
export class TracksSectionLayout {
  grid = Container.get(GridLayout);
  timeline = Container.get(TimelineLayout);
  tracks = Container.get(TracksLayout);
  zoom = Container.get(ZoomLayout);
}
