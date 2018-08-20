import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { Clip, ClipParams } from 'core/models/clip';
import { Envelope } from 'core/models/envelope';
import { SnipLayer } from 'core/models/clip/layer';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { Point } from 'core/models/envelope/point';
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

  // TODO: Get rid of all of this functionality here.... move to some more sensible factory
  _createClip(params: ClipParams) {
    const { length } = params;
    const clip = this.clipStore.createClip(params);
    const start = new TimelineVector(0);

    const envelope = new Envelope(length);
    const a = new Point(start, 0.75);
    const b = new Point(length, 0.25);
    envelope.addPoint(a);
    envelope.addPoint(b);

    const snip = this.snipStore.createSnip({
      data: envelope,
      length: params.length,
    });

    const snipLayer = new SnipLayer(snip);
    clip.addLayer(snipLayer);
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
