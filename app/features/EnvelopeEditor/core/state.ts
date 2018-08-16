import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { EnvelopeEditorLayout } from 'features/EnvelopeEditor/core';

import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Props } from 'features/EnvelopeEditor';

@Service()
export default class __EnvelopeEditorState {
  @Inject(_ => EnvelopeEditorLayout)
  private layout: EnvelopeEditorLayout;

  constructor(public envelope: Envelope) {
    console.log('🐸', arguments);
  }
  snapToGrid = new SnapToGrid();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
    this.snapToGrid = props.snapToGrid;
  }
}
