import { computed, observable } from 'mobx';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';
import { TimelineVector } from 'core/primitives/timeline-vector/simple';

import { Graph } from 'core/state/tree/graph';

export interface ClipParams {
  trackId: string;
  position: TimelineVector;
  length?: TimelineVector;
  graph?: Graph;
}

@model('fiddle/core/Clip')
export class Clip extends Model({
  id: prop<string>(() => generateId()),
  trackId: prop<string>(),
  length: prop<TimelineVector>(() => new TimelineVector(2)),
  position: prop<TimelineVector>(),
  graph: prop<Graph>(() => new Graph({})),
}) {
  @modelAction
  setTrackId(trackId: string) {
    this.trackId = trackId;
  }

  @modelAction
  setLength(length: TimelineVector) {
    this.length = length;
  }

  @modelAction
  setPosition(position: TimelineVector) {
    this.position = position;
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  @observable
  isSelected = false;
  @observable
  isDragging = false;
}
