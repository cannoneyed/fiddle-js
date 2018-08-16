import { action, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { logMethods } from 'utils/log-filter';
import { clamp, first, last, min, max } from 'lodash';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipActions, ClipStore, TrackStore } from 'core';

import {
  ClipMoveService,
  ClipSelectInteraction,
  GridService,
  SequencerPositionService,
  TracksPositionService,
} from 'features/Sequencer/core';

export const DRAG_DELAY: number = 200;

@Service()
export default class __ClipDragInteraction {
  static mobxLoggerConfig = logMethods('beginDrag', 'endDrag');

  @Inject(_ => ClipActions)
  private clipActions: ClipActions;
  @Inject(_ => ClipMoveService)
  private clipMoveService: ClipMoveService;
  @Inject(_ => ClipSelectInteraction)
  private clipSelect: ClipSelectInteraction;
  @Inject(_ => ClipStore)
  private clipStore: ClipStore;
  @Inject(_ => GridService)
  private gridService: GridService;
  @Inject(_ => SequencerPositionService)
  private sequencerPositionService: SequencerPositionService;
  @Inject(_ => TracksPositionService)
  private tracksPositionService: TracksPositionService;
  @Inject(_ => TrackStore)
  private trackStore: TrackStore;

  @observable
  isDragging: boolean = false;

  @observable
  deltaX: number = 0;
  @observable
  deltaY: number = 0;

  @observable
  startX: number;
  @observable
  startY: number;

  @observable
  handleClip: Clip;
  @observable
  handleClipOffsetX: number;
  @observable
  relativePositions = observable.map<string, ScreenVector>({});

  @observable
  dropTargetTimelinePosition: TimelineVector;
  @observable
  dropTargetTrackIndex: number;

  deltaTimelinePosition = new TimelineVector();
  deltaTrackIndex: number;

  lowerPositionBound: TimelineVector;
  upperPositionBound: TimelineVector;
  lowerTrackIndexBound: number;
  upperTrackIndexBound: number;

  @action
  setIsDragging = (isDragging = true) => {
    this.isDragging = isDragging;
  };

  @action
  setStartPosition = (x: number, y: number) => {
    this.startX = x;
    this.startY = y;
  };

  @action
  setDelta = (deltaX: number, deltaY: number) => {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.computeDragTargets();
  };

  @action
  computeDragTargets = () => {
    const offsetX = this.handleClipOffsetX + this.deltaX;
    const y = this.startY + this.deltaY;

    // Compute the timeline position where the clip is being dragged to
    const snapToGridPosition = this.gridService.getNearestSnapPosition(offsetX);

    const position = TimelineVector.clamp(
      snapToGridPosition,
      this.lowerPositionBound,
      this.upperPositionBound
    );

    this.dropTargetTimelinePosition = position;

    // Compute the track where the clip is being dragged to
    const offsetY = this.tracksPositionService.getOffsetYFromScreenY(y);
    const dropTargetTrack = this.tracksPositionService.getTrackFromOffsetY(offsetY);

    let dropTargetTrackIndex = dropTargetTrack ? dropTargetTrack.index : 0;
    const { lowerTrackIndexBound, upperTrackIndexBound } = this;
    dropTargetTrackIndex = clamp(dropTargetTrackIndex, lowerTrackIndexBound, upperTrackIndexBound);
    this.dropTargetTrackIndex = dropTargetTrackIndex;

    const deltaTrackIndex = dropTargetTrackIndex - this.handleClip.track.index;
    const deltaTimelinePosition = position.subtract(this.handleClip.position);

    if (
      deltaTrackIndex !== this.deltaTrackIndex ||
      !this.deltaTimelinePosition.equals(deltaTimelinePosition)
    ) {
      this.deltaTrackIndex = deltaTrackIndex;
      this.deltaTimelinePosition = deltaTimelinePosition;
      this.updateDraggedClips();
    }
  };

  @action
  updateDraggedClips() {
    this.clipStore.getDraggedClips().forEach(draggedClip => {
      const originalClip = this.clipStore.clips.get(draggedClip.id)!;
      draggedClip.position = originalClip.position.add(this.deltaTimelinePosition);

      const nextIndex = originalClip.track.index + this.deltaTrackIndex;
      const nextTrack = this.trackStore.getTrackByIndex(nextIndex);
      draggedClip.trackId = nextTrack.id;
    });
  }

  @action
  beginDrag = (handleClip: Clip) => {
    this.isDragging = true;
    this.handleClip = handleClip;

    console.log('👍', this);

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipOffsetX = this.sequencerPositionService.getOffsetX(handleClip.position);

    // Set all temporary dragging clips for rendering in the tracks
    const { selectedClips } = this.clipSelect;
    this.clipActions.setDraggedClips(selectedClips);

    // Compute the range of positions so that the clips can't be dragged out of the timeline
    const startPositions = selectedClips.map(clip => clip.position);
    const endPositions = selectedClips.map(clip => clip.end);

    const timelineStart = this.sequencerPositionService.getTimelineStart();
    const timelineEnd = this.sequencerPositionService.getTimelineEnd();
    const minStartPosition = first(TimelineVector.sortAscending(startPositions)) || timelineStart;
    const maxEndPosition = last(TimelineVector.sortAscending(endPositions)) || timelineEnd;

    this.lowerPositionBound = handleClip.position.subtract(minStartPosition);
    this.upperPositionBound = timelineEnd.subtract(maxEndPosition.subtract(handleClip.position));

    // Compute the range of track indices of the selected clips so that the clips can't be dragged
    // above or below the maximum or minimum clip
    const minSelectedTrackIndex = min(selectedClips.map(clip => clip.track.index)) || 0;
    const maxSelectedTrackIndex = max(selectedClips.map(clip => clip.track.index)) || 0;

    const maxIndex = this.trackStore.trackList.length - 1;
    this.lowerTrackIndexBound = handleClip.track.index - minSelectedTrackIndex;
    this.upperTrackIndexBound = maxIndex - (maxSelectedTrackIndex - handleClip.track.index);

    selectedClips.forEach(clip => (clip.isDragging = true));
  };

  @action
  endDrag = () => {
    const { handleClip, dropTargetTimelinePosition, dropTargetTrackIndex } = this;
    if (dropTargetTimelinePosition) {
      const { selectedClips } = this.clipSelect;
      const deltaTimeline = dropTargetTimelinePosition.subtract(handleClip.position);
      const deltaTrackIndex = dropTargetTrackIndex - handleClip.track.index;
      this.clipMoveService.moveClips(selectedClips, deltaTimeline, deltaTrackIndex);
      selectedClips.forEach(clip => (clip.isDragging = false));
    }

    this.isDragging = false;
    this.relativePositions.clear();

    this.clipActions.clearDraggedClips();
  };
}
