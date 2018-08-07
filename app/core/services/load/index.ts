import { Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { ClipActions, ClipParams } from 'core/actions/clip';
import { TrackStore } from 'core/state/stores/tracks';
import { TimelineVector } from '../../primitives/timeline-vector';

@Service()
export class LoadService {
  constructor(private clipActions: ClipActions, private trackStore: TrackStore) {}

  @action
  loadSession() {
    const timelineLength = 64;
    const tracksCount = 64;

    const tracks = range(tracksCount).map(() => this.trackStore.createTrack());

    const clipParams: ClipParams[] = [];
    for (let i = 0; i < 100; i++) {
      const trackId = Math.floor(Math.random() * tracksCount - 1) + 1;
      const position = Math.floor(Math.random() * timelineLength - 2) + 1;

      clipParams.push({
        trackId: tracks[trackId].id,
        length: new TimelineVector(1),
        position: new TimelineVector(position),
      });
    }
    this.clipActions.createClips(clipParams);
  }
}
