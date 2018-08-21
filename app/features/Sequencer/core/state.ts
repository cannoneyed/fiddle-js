import { Service } from 'libs/typedi';

import { SnapToGrid } from 'core/models/snap-to-grid';

@Service()
export default class __SequencerState {
  snapToGrid = new SnapToGrid();
}
