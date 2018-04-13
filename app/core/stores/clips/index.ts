import { action, observable } from 'mobx';

import { Clip, IClipConstructorParams } from 'core/models/clip';
import { TimelineVector } from 'core/classes/timeline-vector';

import { clipSelect } from 'core/interactions/clip/select';

export class ClipStore {
  // The main store for clips (by id)
  @observable clips = observable.map<string, Clip>({});

  constructor() {
    this.createClip({
      trackId: '20',
      position: new TimelineVector(4),
    });
  }

  // Actions
  @action.bound
  createClip = (params: IClipConstructorParams) => {
    const { trackId, position } = params;
    const clip = new Clip({ trackId, position });
    this.clips.set(clip.id, clip);
  };

  @action.bound
  deleteClip = (clipId: string) => {
    this.clips.delete(clipId);
  };

  @action.bound
  deleteSelectedClips = () => {
    clipSelect.selectedClips.forEach((clip: Clip) => {
      this.clips.delete(clip.id);
    });
  };

  @action.bound
  deleteClipsByTrackId = (trackId: string) => {
    this.clips.forEach((clip: Clip, clipId) => {
      if (clip.trackId === trackId) {
        this.clips.delete(clipId);
      }
    });
  };

  @observable
  getClips = () => {
    return Array.from(this.clips.values());
  };
}

export const clipStore = new ClipStore();
