import { observable } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';
import { TimeSignature } from 'core/classes/time-signature';

export class SequencerState {
  @observable tempo = 120;

  @observable timeSignature = new TimeSignature();
  @observable snapToGrid = new SnapToGrid();
}

export const sequencerState = new SequencerState();
