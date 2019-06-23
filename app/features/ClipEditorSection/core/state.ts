import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Clip } from 'core/models/clip';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { ClipEditorGlobalState, ClipEditorLayout } from 'features/ClipEditorSection/core';

import { Props } from 'features/ClipEditorSection';

@Service()
export default class ClipEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  @Inject(_ => ClipEditorLayout)
  layout: ClipEditorLayout;

  @Inject(_ => ClipEditorGlobalState)
  global: ClipEditorGlobalState;

  hasBeenInitialized = false;

  clip: Clip;

  get snapToGrid(): SnapToGrid {
    return this.global.snapToGrid;
  }

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
  }
}
