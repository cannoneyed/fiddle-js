import { observable } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';
import { Snip } from 'core/models/snip';

export type Layer = SnipLayer | OperatorLayer;

export class SnipLayer {
  @observable
  snip: Snip;

  constructor(snip: Snip) {
    this.snip = snip;
  }

  @observable
  snipPosition = new TimelineVector();
}

export class OperatorLayer {}
