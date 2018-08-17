import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { Clip } from 'core/models/clip';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { ClipEditorLayout } from 'features/ClipEditorSection/core';

import { Props } from 'features/ClipEditorSection';

@Service()
export default class __ClipEditorState {
  @Inject(_ => ClipEditorLayout)
  layout: ClipEditorLayout;

  clip: Clip;

  snapToGrid = new SnapToGrid();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
  }
}
