import { computed } from 'mobx';
import { model, Model, prop } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';

import { getClipsStore } from 'core/state/tree';

@model('fiddle/core/Track')
export class Track extends Model({
  id: prop<string>(() => generateId()),
}) {
  @computed
  get clips() {
    const clipsStore = getClipsStore();
    const clips = clipsStore.getClips();
    return clips.filter(clip => clip.trackId === this.id);
  }
}
