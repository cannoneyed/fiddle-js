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

  @observable
  rowHeight = 20;

  @computed
  get gridSegmentWidth() {
    const { timeline, snapToGrid } = this.state;
    return timeline.getFractionWidth(snapToGrid.division);
  }
}
