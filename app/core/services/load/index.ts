import { Service } from 'typedi';
import { action } from 'mobx';
import { range } from 'lodash';

import { TrackStore } from 'core/state/stores/tracks';

@Service()
export class LoadService {
  constructor(private trackStore: TrackStore) {}

  @action
  loadSession() {
    const tracksCount = 3;

    range(tracksCount).map(() => this.trackStore.createTrack());
  }
}
