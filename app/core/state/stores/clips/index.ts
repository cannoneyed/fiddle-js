import { Inject, Service } from 'libs/typedi';
import { observable } from 'mobx';

import { DraggedClips } from 'core';
import { Clip, ClipParams } from 'core/models/clip';

@Service({ global: true })
export default class __ClipStore {
  @Inject(type => DraggedClips)
  private draggedClipsStore: DraggedClips;

  // The main store for clips (by id)
  @observable
  clips = observable.map<string, Clip>({});

  @observable
  getClips = () => {
    return Array.from(this.clips.values());
  };

  @observable
  getClipById = (clipId: string | null): Clip | null => {
    const clip = clipId ? this.clips.get(clipId) : null;
    return clip || null;
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

export { Clip, ClipParams };
