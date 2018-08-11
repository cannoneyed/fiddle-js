import { observable } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

export class TimelineState {
  @observable length: TimelineVector;

  constructor(length: TimelineVector) {
    this.length = length;
  }
}
