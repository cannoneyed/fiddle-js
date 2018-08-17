import { Inject, Service } from 'typedi';
import { computed, observable } from 'mobx';

import { Dimensions } from 'core/interfaces';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { EnvelopeEditorState } from 'features/EnvelopeEditor/core';

@Service()
export default class __EnvelopeEditorLayout {
  @Inject(_ => EnvelopeEditorState)
  private state: EnvelopeEditorState;

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };

  @observable
  rowHeight = 20;

  @observable
  pianoRollWidth = 20;

  @computed
  get gridSegmentWidth() {
    const { envelope, snapToGrid } = this.state;
    return SnapToGrid.getDivisionWidth(envelope.length, this.dimensions.width, snapToGrid);
  }

  @computed
  get pianoRollDimensions() {
    return {
      height: this.dimensions.height,
      width: this.pianoRollWidth,
    };
  }
}
