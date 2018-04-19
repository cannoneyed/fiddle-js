import { Container, Service } from 'typedi';

import { GridLayout } from './grid';
import { TimelineLayout } from './timeline';
import { tracksLayout } from './tracks';
import { zoomLayout } from './zoom';

@Service()
export class TracksSectionLayout {
  grid = Container.get(GridLayout);
  timeline = Container.get(TimelineLayout);
  tracks = tracksLayout;
  zoom = zoomLayout;
}

export const tracksSectionLayout = Container.get(TracksSectionLayout);
