import { Service } from 'typedi';
import { observable } from 'mobx';
import { json } from 'core/serialization/json';

import { DraggedClips } from './dragged';
import { Clip, ClipParams } from 'core/models/clip';

@Service()
export class ClipStore {
  constructor(private draggedClipsStore: DraggedClips) {}

  // The main store for clips (by id)
  @json
  @observable
  clips = observable.map<string, Clip>({});

  @observable
  getClips = () => {
    return Array.from(this.clips.values());
  };

  @observable
  getClipById = (clipId: string) => {
    return this.clips.get(clipId);
  };

  // Actions
  createClip = (params: ClipParams) => {
    const clip = new Clip(params);
    this.clips.set(clip.id, clip);
    return clip;
  };

  deleteClip = (clip: Clip) => {
    this.clips.delete(clip.id);
  };

  deleteClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      this.clips.delete(clip.id);
    });
  };

  deleteClipsByTrackId = (trackId: string) => {
    this.clips.forEach((clip: Clip, clipId) => {
      if (clip.trackId === trackId) {
        this.clips.delete(clipId);
      }
    });
  };

  getDraggedClips() {
    return this.draggedClipsStore.getDraggedClips();
  }
}

export { ClipParams };
