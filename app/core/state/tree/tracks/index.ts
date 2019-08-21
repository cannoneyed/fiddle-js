import { computed } from 'mobx';
import { model, Model, modelAction, prop } from 'mobx-keystone';
import { Track } from 'core/state/tree/track';
import { first, last } from 'lodash';

@model('fiddle/core/Tracks')
export class Tracks extends Model({
  tracks: prop<Track[]>(() => []),
}) {
  getTrackById = (trackId: string): Track | undefined => {
    return this.tracks.find(track => track.id === trackId);
  };

  getTrackByIndex = (trackIndex: number): Track | undefined => {
    return this.tracks[trackIndex];
  };

  @computed
  get firstTrack() {
    return first(this.tracks);
  }

  @computed
  get lastTrack() {
    return last(this.tracks);
  }

  @modelAction
  createTrack = () => {
    const track = new Track({});
    this.tracks.push(track);
    return track;
  };

  @modelAction
  deleteTrack = (trackId: string) => {
    this.tracks = this.tracks.filter(track => track.id !== trackId);
  };
}
