import { Service } from 'libs/typedi';
import { observable } from 'mobx';

import { TimelineVector } from 'core/primitives/timeline-vector';

@Service()
export default class __TimelineState {
  @observable
  length = new TimelineVector(64);
  @observable
  playheadPosition = new TimelineVector();
}
