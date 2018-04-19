import { Service } from 'typedi';
import { observable } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';
import { TimeSignature } from 'core/primitives/time-signature';

@Service()
export class SequencerState {
  @observable tempo = 120;

  @observable timeSignature = new TimeSignature();
  @observable snapToGrid = new SnapToGrid();
}
