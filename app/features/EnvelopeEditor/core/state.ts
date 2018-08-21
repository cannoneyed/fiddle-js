import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { EnvelopeEditorLayout } from 'features/EnvelopeEditor/core';

import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Props } from 'features/EnvelopeEditor';

@Service()
export default class __EnvelopeEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  @Inject(_ => EnvelopeEditorLayout)
  private layout: EnvelopeEditorLayout;

  envelope: Envelope;

  snapToGrid = new SnapToGrid();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
    this.snapToGrid = props.snapToGrid;
  }
}
