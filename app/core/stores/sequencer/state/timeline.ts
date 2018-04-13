export const prefixModule = 'prefixModule';

import { observable } from 'mobx';

import { TimelineVector } from 'core/classes/timeline-vector';

export class TimelineState {
  @observable length = 64;

  @observable playheadPosition = new TimelineVector();
}

export const timelineState = new TimelineState();
