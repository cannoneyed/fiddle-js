import { Inject, Service } from 'typedi';
import { computed } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipEditorState } from 'features/ClipEditorSection/core';

@Service()
export default class __ClipEditorTimeline {
  @Inject(_ => ClipEditorState)
  state: ClipEditorState;

  @computed
  get length(): TimelineVector {
    return this.state.clip.length;
  }
}
