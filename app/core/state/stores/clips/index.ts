import { Service } from 'typedi';
import { action, observable } from 'mobx';
import { json } from 'core/serialization/json';

import { SnipStore } from 'core/state/stores/snips';
import { Clip, ClipParams } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

@Service()
export class ClipStore {
  constructor(private snipStore: SnipStore) {}

  // The main store for clips (by id)
  @json
  @observable
  clips = observable.map<string, Clip>({});

  // The temporary store for clips being dragged in the sequencer
  @observable draggedClips = observable.map<string, Clip>({});

  // Actions
  @action
  create = (params: ClipParams) => {
    const clip = new Clip(params);

    // Add a new default snip as well
    const snip = this.snipStore.create(params);
    clip.addSnip(snip.id);

    this.clips.set(clip.id, clip);
  };

  @action
  deleteClip = (clip: Clip) => {
    this.clips.delete(clip.id);
  };

  @action
  deleteClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      this.clips.delete(clip.id);
    });
  };

  @action
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

  getClipById = (clipId: string) => {
    return this.clips.get(clipId);
  };

  @observable
  getDraggedClips = () => {
    return Array.from(this.draggedClips.values());
  };

  @action
  setDraggedClips = (clips: Clip[]) => {
    clips.forEach(clip => {
      const draggedClip = Clip.copy(clip);
      draggedClip.isDragging = true;
      draggedClip.isSelected = true;
      draggedClip.id = clip.id;
      draggedClip.position = draggedClip.position.add(new TimelineVector(1));
      this.draggedClips.set(draggedClip.id, draggedClip);
    });
  };

  @action
  clearDraggedClips = () => {
    this.draggedClips.clear();
  };
}

export { ClipParams };
