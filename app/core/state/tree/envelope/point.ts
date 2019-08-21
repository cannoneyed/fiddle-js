import { observable } from 'mobx';
import { model, Model, prop, modelAction } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector/simple';

@model('fiddle/core/Envelope/Point')
export class Point extends Model({
  id: prop<string>(() => generateId()),
  position: prop<TimelineVector>(),
  value: prop<number>(),
}) {
  @observable
  selected = false;

  @modelAction
  setPosition(position: TimelineVector) {
    this.position = position;
  }
}
