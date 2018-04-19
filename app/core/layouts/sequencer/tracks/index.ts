import { Container, Service } from 'typedi';

import { GridLayout } from './grid';
import { timelineLayout } from './timeline';
import { tracksLayout } from './tracks';
import { zoomLayout } from './zoom';

@Service()
export class TracksSectionLayout {
  grid = Container.get(GridLayout);
  timeline = timelineLayout;
  tracks = tracksLayout;
  zoom = zoomLayout;
}

export const tracksSectionLayout = Container.get(TracksSectionLayout);
