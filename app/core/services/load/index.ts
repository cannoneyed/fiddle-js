import { Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { ClipActions } from 'core/actions/clip';
import { TrackStore } from 'core/state/stores/tracks';
import { TimelineVector } from '../../primitives/timeline-vector';

@Service()
export class LoadService {
  constructor(private clipActions: ClipActions, private trackStore: TrackStore) {}

  @action
  loadSession() {
    const tracks = range(3).map(() => this.trackStore.createTrack());
    this.clipActions.createClip({
      trackId: tracks[0].id,
      length: new TimelineVector(2),
      position: new TimelineVector(4),
    });
  }
}
