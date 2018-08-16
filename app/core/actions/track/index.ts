import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { ClipActions, TrackStore } from 'core';

@Service({ global: true })
export default class __TrackActions {
  constructor() {
    console.log(this.constructor.name, this);
  }

  @Inject(type => ClipActions)
  private clipActions: ClipActions;

  @Inject(type => TrackStore)
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
