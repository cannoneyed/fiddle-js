import { Service } from 'typedi';
import { observable } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';
import { TimeSignature } from 'core/primitives/time-signature';

@Service()
export class ClipEditorState {
  @observable timeSignature = new TimeSignature();
  @observable snapToGrid = new SnapToGrid();

  @observable selectedClipId: string | null = null;
}
