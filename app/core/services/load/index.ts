import { Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { ClipStore } from 'core/state/stores/clips';
import { TrackStore } from 'core/state/stores/tracks';
import { TimelineVector } from '../../primitives/timeline-vector';

@Service()
export class LoadService {
  constructor(private clipStore: ClipStore, private trackStore: TrackStore) {}

  @action
  loadSession() {
    const tracks = range(3).map(() => this.trackStore.createTrack());
    this.clipStore.create({
      trackId: tracks[0].id,
      length: new TimelineVector(2),
      position: new TimelineVector(4),
    });
  }
}
