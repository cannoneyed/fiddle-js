import { gridLayout } from './grid';
import { timelineLayout } from './timeline';
import { tracksLayout } from './tracks';
import { zoomLayout } from './zoom';

export class TracksSectionLayout {
  grid = gridLayout;
  timeline = timelineLayout;
  tracks = tracksLayout;
  zoom = zoomLayout;
}

export const tracksSectionLayout = new TracksSectionLayout();
