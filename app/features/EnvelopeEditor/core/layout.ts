import { computed, observable } from 'mobx';

import { Dimensions } from 'core/interfaces';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { EnvelopeEditorCore } from './index';

export class EnvelopeEditorLayout {
  constructor(private core: EnvelopeEditorCore) {}

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };

  @observable rowHeight = 20;

  @observable pianoRollWidth = 20;

  @computed
  get gridSegmentWidth() {
    const { envelope, layout, snapToGrid } = this.core;
    return SnapToGrid.getDivisionWidth(envelope.length, layout.dimensions.width, snapToGrid);
  }

  @computed
  get pianoRollDimensions() {
    return {
      height: this.dimensions.height,
      width: this.pianoRollWidth,
    };
  }
}
