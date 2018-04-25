import { Inject, Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { ClipStore } from 'core/stores/clips';
import { TrackStore } from 'core/stores/tracks';
import { TimelineVector } from '../../primitives/timeline-vector';

@Service()
export class LoadService {
  @Inject(type => ClipStore)
  clipStore: ClipStore;

  @Inject(type => TrackStore)
  trackStore: TrackStore;

  @action
  loadSession() {
    const tracks = range(3).map(() => this.trackStore.createTrack());
    this.clipStore.createClip({
      trackId: tracks[0].id,
      length: new TimelineVector(2),
      position: new TimelineVector(4),
    });
  }
}
