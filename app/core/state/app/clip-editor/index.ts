import { Service } from 'typedi';
import { observable } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';

@Service()
export class ClipEditorState {
  @observable snapToGrid = new SnapToGrid();
  @observable selectedClipId: string | null = null;

  setClipEditing(clipId: string) {
    this.selectedClipId = clipId;
  }
}
