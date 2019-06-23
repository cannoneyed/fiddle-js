import { Service } from 'libs/typedi';
import { computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { first, last } from 'lodash';

import { Track } from 'core/models/track';

@Service({ global: true })
export default class TrackStore {
  static mobxLoggerConfig = filterMethods('updateTrackIndices');

  // The main store for tracks (by id)
  @observable
  tracks = observable.map<string, Track>({});
  @observable
  trackList = observable.array<Track>([]);

  getTrackById = (trackId: string) => {
    return this.tracks.get(trackId);
  };

  getTrackByIndex = (trackIndex: number) => {
    return this.trackList[trackIndex];
  };

  @computed
  get firstTrack() {
    return first(this.trackList);
  }

  @computed
  get lastTrack() {
    return last(this.trackList);
  }

  updateTrackIndices = () => {
    this.trackList.forEach((track, index) => (track.index = index));
  };

  createTrack = () => {
    const track = new Track();
    this.tracks.set(track.id, track);
    this.trackList.push(track);
    this.updateTrackIndices();
    return track;
  };

  deleteTrack = (trackId: string) => {
    this.trackList.replace(this.trackList.filter(track => track.id !== trackId));
    this.tracks.delete(trackId);
    this.updateTrackIndices();
  };
}
