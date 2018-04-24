import { action, observable } from 'mobx';
import { Service } from 'typedi';
import { logMethods } from 'utils/log-filter';
import { clamp, min, max } from 'lodash';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';

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

  @observable dropTargetTimelinePosition: TimelineVector | null;
  @observable dropTargetTrackIndex: number;

  lowerTimelineTicksBound: number;
  upperTimelineTicksBound: number;
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
  };

  @action
  computeDragTargets = () => {
    const x = this.handleClipScreenPosition.x + this.deltaX;
    const y = this.startY + this.deltaY;

    // Compute the timeline position where the clip is being dragged to
    const offsetX = this.tracksPositionService.getOffsetXFromScreenX(x);
    const snapToGridPosition = this.gridService.getNearestSnapPosition(offsetX);
    this.setDropTargetTimelinePosition(snapToGridPosition);

    // Compute the track where the clip is being dragged to
    const offsetY = this.tracksPositionService.getOffsetYFromScreenY(y);
    const dropTargetTrack = this.tracksPositionService.getTrackFromOffsetY(offsetY);

    let dropTargetTrackIndex = dropTargetTrack ? dropTargetTrack.index : 0;
    const { lowerTrackIndexBound, upperTrackIndexBound } = this;
    dropTargetTrackIndex = clamp(dropTargetTrackIndex, lowerTrackIndexBound, upperTrackIndexBound);
    this.setDropTargetTrackIndex(dropTargetTrackIndex);
  };

  @action
  beginDrag = (handleClip: Clip) => {
    this.isDragging = true;
    this.handleClip = handleClip;

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipScreenPosition = handleClip.getScreenVector();

    const { selectedClips } = this.clipSelect;
    // Compute the range of positions so that the clips can't be dragged out of the timeline
    const { getTicks } = this.sequencerPositionService;
    const startTicks = selectedClips.map(clip => getTicks(clip.position));
    const endTicks = selectedClips.map(clip => getTicks(clip.position) + getTicks(clip.length));
    const minTimelineDragTicks = min(startTicks) || 0;
    const maxTimelineDragTicks = max(endTicks) || 0;

    this.lowerTimelineTicksBound = getTicks(handleClip.position) - minTimelineDragTicks;
    this.upperTimelineTicksBound =
      maxTimelineDragTicks -
      (getTicks(handleClip.position.add(handleClip.length)) - maxTimelineDragTicks);

    // Compute the range of track indices of the selected clips so that the clips can't be dragged
    // above or below the maximum or minimum clip
    const minSelectedTrackIndex = min(selectedClips.map(clip => clip.track.index)) || 0;
    const maxSelectedTrackIndex = max(selectedClips.map(clip => clip.track.index)) || 0;

    const maxIndex = this.trackStore.trackList.length - 1;
    this.lowerTrackIndexBound = handleClip.track.index - minSelectedTrackIndex;
    this.upperTrackIndexBound = maxIndex - (maxSelectedTrackIndex - handleClip.track.index);
  };

  @action
  endDrag = () => {
    const { handleClip, dropTargetTimelinePosition, dropTargetTrackIndex } = this;
    if (dropTargetTimelinePosition) {
      const { selectedClips } = this.clipSelect;
      const deltaTimeline = dropTargetTimelinePosition.subtract(handleClip.position);
      const deltaTrackIndex = dropTargetTrackIndex - handleClip.track.index;
      this.clipMoveService.moveClips(selectedClips, deltaTimeline, deltaTrackIndex);
    }

    this.isDragging = false;
    this.relativePositions.clear();
  };
}
