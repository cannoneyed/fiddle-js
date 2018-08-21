import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';

import { ClipActions, TrackStore } from 'core';

@Service({ global: true })
export default class __TrackActions {
  @Inject(_ => ClipActions)
  private clipActions: ClipActions;

  @Inject(_ => TrackStore)
  private trackStore: TrackStore;

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
