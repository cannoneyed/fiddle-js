import { Inject, Service } from 'typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Clip } from 'core/models/clip';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { ClipEditorLayout } from 'features/ClipEditorSection/core';

import { Props } from 'features/ClipEditorSection';

@Service()
export default class __ClipEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  newlyConstructed = true;

  @Inject(_ => ClipEditorLayout)
  layout: ClipEditorLayout;

  clip: Clip;

  snapToGrid = new SnapToGrid();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
  }
}
