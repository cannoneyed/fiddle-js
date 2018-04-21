import { Inject, Service } from 'typedi';
import { action, observable } from 'mobx';

import { Track } from 'core/models/track';
import { ClipStore } from 'core/stores/clips';

@Service()
export class TrackStore {
  @Inject(type => ClipStore)
  clipStore: ClipStore;

  // The main store for tracks (by id)
  @observable tracks = observable.map<string, Track>({});

  // The main page list of recipe ids
  @observable trackList = observable.array<Track>([]);

  getTrackById = (trackId: string) => {
    return this.tracks.get(trackId);
  };

  // Actions
  @action.bound
  createTrack = () => {
    const track = new Track();

    this.tracks.set(track.id, track);
    this.trackList.unshift(track);
    return track;
  };

  @action
  deleteTrack = (trackId: string) => {
    this.trackList.replace(this.trackList.filter(track => track.id !== trackId));

    this.clipStore.deleteClipsByTrackId(trackId);
    this.tracks.delete(trackId);
  };
}
