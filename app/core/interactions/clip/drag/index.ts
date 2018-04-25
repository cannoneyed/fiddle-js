import { action, observable } from 'mobx';
import { Service } from 'typedi';
import { logMethods } from 'utils/log-filter';
import { clamp, first, last, min, max } from 'lodash';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipStore } from 'core/stores/clips';
import { ClipMoveService } from 'core/services/sequencer/clip-move';
import { ClipSelect } from 'core/interactions/clip/select';
import { SequencerPositionService } from 'core/services/sequencer/position';
import { TracksPositionService } from 'core/services/sequencer/position/tracks';
import { GridService } from 'core/services/sequencer/grid';
import { TrackStore } from 'core/stores/tracks';

export const DRAG_DELAY: number = 200;

@Service()
export class ClipDragInteraction {
  static mobxLoggerConfig = logMethods('beginDrag', 'endDrag');

  constructor(
    private clipSelect: ClipSelect,
    private clipStore: ClipStore,
    private clipMoveService: ClipMoveService,
    private gridService: GridService,
    private sequencerPositionService: SequencerPositionService,
    private tracksPositionService: TracksPositionService,
    private trackStore: TrackStore
  ) {}

  @observable isDragging: boolean = false;

  @observable deltaX: number = 0;
  @observable deltaY: number = 0;

  @observable startX: number;
  @observable startY: number;

  @observable handleClip: Clip;
  @observable handleClipScreenPosition: ScreenVector;
  @observable relativePositions = observable.map<string, ScreenVector>({});

  @observable dropTargetTimelinePosition: TimelineVector;
  @observable dropTargetTrackIndex: number;

  shouldUpdateDraggedClips = false;
  deltaTimelinePosition: TimelineVector;
  deltaTrackIndex: number;

  lowerPositionBound: TimelineVector;
  upperPositionBound: TimelineVector;
  lowerTrackIndexBound: number;
  upperTrackIndexBound: number;

  @action
  setIsDragging = (isDragging: boolean) => {
    this.isDragging = true;
  };

  @action
  setDropTargetTimelinePosition = (position: TimelineVector) => {
    this.dropTargetTimelinePosition = position;
  };

  @action
  setDropTargetTrackIndex = (trackIndex: number) => {
    this.dropTargetTrackIndex = trackIndex;
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
    this.updateDraggedClips();
  };

  @action
  computeDragTargets = () => {
    const x = this.handleClipScreenPosition.x + this.deltaX;
    const y = this.startY + this.deltaY;

    // Compute the timeline position where the clip is being dragged to
    let offsetX = this.tracksPositionService.getOffsetXFromScreenX(x);
    const snapToGridPosition = this.gridService.getNearestSnapPosition(offsetX);
    const position = TimelineVector.clamp(
      snapToGridPosition,
      this.lowerPositionBound,
      this.upperPositionBound
    );

    this.setDropTargetTimelinePosition(position);

    // Compute the track where the clip is being dragged to
    const offsetY = this.tracksPositionService.getOffsetYFromScreenY(y);
    const dropTargetTrack = this.tracksPositionService.getTrackFromOffsetY(offsetY);

    let dropTargetTrackIndex = dropTargetTrack ? dropTargetTrack.index : 0;
    const { lowerTrackIndexBound, upperTrackIndexBound } = this;
    dropTargetTrackIndex = clamp(dropTargetTrackIndex, lowerTrackIndexBound, upperTrackIndexBound);
    this.setDropTargetTrackIndex(dropTargetTrackIndex);

    const deltaTrackIndex = dropTargetTrackIndex - this.handleClip.track.index;
    const deltaTimelinePosition = position.subtract(this.handleClip.position);

    if (
      deltaTrackIndex !== this.deltaTrackIndex ||
      !this.deltaTimelinePosition.isEqualTo(deltaTimelinePosition)
    ) {
      this.deltaTrackIndex = deltaTrackIndex;
      this.deltaTimelinePosition = deltaTimelinePosition;
      this.shouldUpdateDraggedClips = true;
    }
  };

  @action
  updateDraggedClips() {
    if (this.shouldUpdateDraggedClips) {
      this.clipStore.draggedClips.forEach(draggedClip => {
        const originalClip = this.clipStore.clips.get(draggedClip.id)!;
        draggedClip.position = originalClip.position.add(this.deltaTimelinePosition);

        const nextIndex = originalClip.track.index + this.deltaTrackIndex;
        const nextTrack = this.trackStore.getTrackByIndex(nextIndex);
        draggedClip.trackId = nextTrack.id;
      });
    }
    this.shouldUpdateDraggedClips = false;
  }

  @action
  beginDrag = (handleClip: Clip) => {
    this.isDragging = true;
    this.handleClip = handleClip;

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipScreenPosition = handleClip.getScreenVector();

    // Set all temporary dragging clips for rendering in the tracks
    const { selectedClips } = this.clipSelect;
    this.clipStore.setDraggedClips(selectedClips);

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

    this.clipStore.clearDraggedClips();
  };
}
