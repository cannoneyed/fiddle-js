import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { Clip, ClipParams } from 'core/models/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipEditorState, ClipStore, DraggedClips, SnipStore, TrackStore } from 'core';

@Service({ global: true })
export default class __ClipActions {
  @Inject(_ => ClipEditorState)
  private clipEditorState: ClipEditorState;

  @Inject(_ => ClipStore)
  private clipStore: ClipStore;

  @Inject(_ => DraggedClips)
  private draggedClips: DraggedClips;

  @Inject(_ => SnipStore)
  private snipStore: SnipStore;

  @Inject(_ => TrackStore)
  private trackStore: TrackStore;

  @action
  createClips(params: ClipParams[]) {
    return params.map(param => {
      return this._createClip(param);
    });
  }

  @action
  createClip(params: ClipParams) {
    return this._createClip(params);
  }

  _createClip(params: ClipParams) {
    const clip = this.clipStore.createClip(params);
    const snip = this.snipStore.createSnip({
      length: params.length,
      position: new TimelineVector(0),
    });
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

export { ClipParams };
