import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { EnvelopeEditorLayout } from 'features/EnvelopeEditor/core';

import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';
import { Timeline } from 'core/models/timeline';

import { Props } from 'features/EnvelopeEditor';

@Service()
export default class __EnvelopeEditorState {
  static mobxLoggerConfig = filterMethods('updateFromProps');

  @Inject(_ => EnvelopeEditorLayout)
  private layout: EnvelopeEditorLayout;

  envelope: Envelope;
  snapToGrid: SnapToGrid;
  timeline: Timeline;

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
    this.snapToGrid = props.snapToGrid;
    this.timeline = props.timeline;
  }
}
