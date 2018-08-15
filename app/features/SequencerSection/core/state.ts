import { Service } from 'typedi';

import { SnapToGrid } from 'core/models/snap-to-grid';

import { ZoomState } from './zoom';

@Service()
export class SequencerState {
  zoom = new ZoomState();
  snapToGrid = new SnapToGrid();
}
