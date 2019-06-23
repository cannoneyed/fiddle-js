import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Graph } from 'core/models/graph';
import { GraphEditorLayout } from 'features/GraphEditor/core';

import { Props } from 'features/ClipEditorSection';

@Service()
export default class GraphEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  @Inject(_ => GraphEditorLayout)
  layout: GraphEditorLayout;

  hasBeenInitialized = false;

  graph: Graph;

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
  }
}
