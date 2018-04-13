import { gridView } from './grid';
import { tracksView } from './tracks';
import { zoomView } from './zoom';

export class SequencerView {
  grid = gridView;
  tracks = tracksView;
  zoom = zoomView;
}

export const sequencerView = new SequencerView();
