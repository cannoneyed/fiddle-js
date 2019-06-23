import { Service } from 'libs/typedi';
import { observable } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';
import { TimeSignature } from 'core/primitives/time-signature';

@Service()
export default class SequencerState {
  @observable
  tempo = 120;

  @observable
  timeSignature = new TimeSignature();
  @observable
  snapToGrid = new SnapToGrid();
}
