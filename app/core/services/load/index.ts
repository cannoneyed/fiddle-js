import { Inject, Service } from 'typedi';
import { action } from 'mobx';

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
    const track = this.trackStore.createTrack();
    this.clipStore.createClip({
      trackId: track.id,
      position: new TimelineVector(4),
    });
  }
}
