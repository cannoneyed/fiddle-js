import { Service } from 'typedi';
import { observable, action } from 'mobx';

import { SnapToGrid } from 'core/models/snap-to-grid';

@Service()
export class ClipEditorState {
  @observable snapToGrid = new SnapToGrid();
  @observable selectedClipId: string | null = null;

  @action
  setClipEditing(clipId: string) {
    this.selectedClipId = clipId;
  }
}
