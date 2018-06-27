import { Service } from 'typedi';
import { action } from 'mobx';

import { Clip, ClipParams } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipEditorState } from 'core/state/app/clip-editor';
import { ClipStore } from 'core/state/stores/clips';
import { SnipStore } from 'core/state/stores/snips';
import { DraggedClips } from 'core/state/stores/clips/dragged';
import { TrackStore } from 'core/state/stores/tracks';

@Service()
export class ClipActions {
  constructor(
    private clipEditorState: ClipEditorState,
    private clipStore: ClipStore,
    private draggedClips: DraggedClips,
    private snipStore: SnipStore,
    private trackStore: TrackStore
  ) {}

  @action
  createClip(params: ClipParams) {
    const clip = this.clipStore.createClip(params);
    const snip = this.snipStore.createSnip(params);
    clip.addSnip(snip.id);
    return clip;
  }

  @action
  deleteClip(clip: Clip) {
    this.clipStore.deleteClip(clip);
  }

  @action
  deleteClips(clips: Clip[]) {
    this.clipStore.deleteClips(clips);
  }

  @action
  deleteClipsByTrackId(trackId: string) {
    this.clipStore.deleteClipsByTrackId(trackId);
  }

  @action
  moveClip(clip: Clip, deltaTimeline: TimelineVector, deltaTrackIndex = 0) {
    this.moveClips([clip], deltaTimeline);
  }

  @action
  moveClips(clips: Clip[], deltaTimeline: TimelineVector, deltaTrackIndex = 0) {
    clips.forEach(clip => {
      const nextPosition = clip.position.add(deltaTimeline);
      clip.setPosition(nextPosition);

      const nextIndex = clip.track.index + deltaTrackIndex;
      const nextTrack = this.trackStore.getTrackByIndex(nextIndex);
      clip.setTrackId(nextTrack.id);
    });
  }

  @action
  setDraggedClips = (clips: Clip[]) => {
    this.draggedClips.setDraggedClips(clips);
  };

  @action
  clearDraggedClips = () => {
    this.draggedClips.clearDraggedClips();
  };

  @action
  editClip = (clipId: string) => {
    this.clipEditorState.setClipEditing(clipId);
  };
}
