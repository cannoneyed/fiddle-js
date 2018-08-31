import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Clip } from 'core/models/clip';

import { GraphEditorLayout } from 'features/GraphEditor/core';

import { Props } from 'features/ClipEditorSection';

@Service()
export default class __GraphEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  @Inject(_ => GraphEditorLayout)
  layout: GraphEditorLayout;

  hasBeenInitialized = false;

  clip: Clip;

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
  }
}
