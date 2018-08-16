import { Inject, Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { TimelineVector } from '../../primitives/timeline-vector';

import { ClipActions, TrackStore } from 'core';

@Service({ global: true })
export default class __LoadService {
  @Inject(_ => TrackStore)
  private trackStore: TrackStore;

  @Inject(_ => ClipActions)
  private clipActions: ClipActions;

  @action
  loadSession() {
    const tracksCount = 1;

    const tracks = range(tracksCount).map(() => this.trackStore.createTrack());

    const clipParams = {
      trackId: tracks[0].id,
      length: new TimelineVector(2),
      position: new TimelineVector(4),
    };

    const clip = this.clipActions.createClip(clipParams);
    clip.isSelected = true;
    this.clipActions.editClip(clip.id);
  }
}
