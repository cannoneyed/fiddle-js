import { model, Model, modelAction, prop, objectMap, ObjectMap } from 'mobx-keystone';
import { Clip, ClipParams } from 'core/state/tree/models/clip';

@model('fiddle/core/Clips')
export class Clips extends Model({
  clips: prop<ObjectMap<Clip>>(() => objectMap<Clip>()),
}) {
  getClips = () => {
    return Array.from(this.clips.values());
  };

  getClipById = (clipId: string | null): Clip | null => {
    const clip = clipId ? this.clips.get(clipId) : null;
    return clip || null;
  };

  @modelAction
  createClip = (params: ClipParams) => {
    const clip = new Clip(params);
    this.clips.set(clip.id, clip);
    return clip;
  };

  @modelAction
  deleteClip = (clip: Clip) => {
    this.clips.delete(clip.id);
  };

  @modelAction
  deleteClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      this.clips.delete(clip.id);
    });
  };

  @modelAction
  deleteClipsByTrackId = (trackId: string) => {
    this.getClips().forEach((clip: Clip) => {
      if (clip.trackId === trackId) {
        this.clips.delete(clip.id);
      }
    });
  };
}
