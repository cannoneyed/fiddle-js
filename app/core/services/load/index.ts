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
    const tracksCount = 64;

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
