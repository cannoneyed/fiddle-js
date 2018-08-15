import { Service } from 'typedi';
import { action } from 'mobx';

import { ClipActions } from 'core/actions/clip';
import { TrackStore } from 'core/state/stores/tracks';

@Service({ global: true })
export class TrackActions {
  constructor(private clipActions: ClipActions, private trackStore: TrackStore) {}

  @action
  createTrack = () => {
    this.trackStore.createTrack();
  };

  @action
  deleteTrack = (trackId: string) => {
    this.clipActions.deleteClipsByTrackId(trackId);
    this.trackStore.deleteTrack(trackId);
  };
}
