import { Inject, Service } from 'libs/typedi';
import { computed, observable } from 'mobx';

import { Dimensions } from 'core/interfaces';

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

  envelopePadding = {
    horizontal: 0,
    vertical: 1,
  };

  @computed
  get envelopeDimensions(): Dimensions {
    return {
      height: this.dimensions.height - 2 * this.envelopePadding.vertical,
      width: this.dimensions.width,
    };
  }

  @observable
  rowHeight = 20;

  @computed
  get gridSegmentWidth() {
    const { timeline, snapToGrid } = this.state;
    return timeline.getFractionWidth(snapToGrid.division);
  }
}
