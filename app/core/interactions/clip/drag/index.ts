import { action, observable } from 'mobx';
import { Service } from 'typedi';
import { logMethods } from 'utils/log-filter';
import { min, max } from 'lodash';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipMoveService } from 'core/services/sequencer/clip-move';
import { ClipSelect } from 'core/interactions/clip/select';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';
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
    private tracksPositionService: TracksPositionService,
    private tracksMouseInteraction: TracksMouseInteraction,
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

  lowerTrackIndexBound: number;
  upperTrackIndexBound: number;

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = true;
  }

  @action
  setDropTargetTimelinePosition(position: TimelineVector) {
    this.dropTargetTimelinePosition = position;
  }

  @action
  setDropTargetTrackIndex(trackIndex: number) {
    this.dropTargetTrackIndex = trackIndex;
  }

  @action
  setStartPosition(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }

  @action
  setDelta(deltaX: number, deltaY: number) {
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.computeDragTargets();
  }

  @action
  computeDragTargets() {
    const x = this.startX + this.deltaX;

    // Compute the timeline position where the clip is being dragged to
    const offsetX = this.tracksPositionService.getOffsetXFromScreenX(x);
    const snapToGridPosition = this.gridService.getNearestSnapPosition(offsetX);
    this.setDropTargetTimelinePosition(snapToGridPosition);

    const dropTargetTrack = this.tracksMouseInteraction.trackMouseOver;
    const dropTargetTrackIndex = dropTargetTrack ? dropTargetTrack.index : 0;
    this.setDropTargetTrackIndex(dropTargetTrackIndex);
  }

  @action.bound
  beginDrag(handleClip: Clip) {
    this.isDragging = true;
    this.handleClip = handleClip;

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipScreenPosition = handleClip.getScreenVector();

    // Compute the range of track indices of the selected clips so that the clips can't be dragged
    // above or below the maximum or minimum clip
    const { selectedClips } = this.clipSelect;
    const minSelectedTrackIndex = min(selectedClips.map(clip => clip.track.index)) || 0;
    const maxSelectedTrackIndex = max(selectedClips.map(clip => clip.track.index)) || 0;

    const maxIndex = this.trackStore.trackList.length - 1;
    this.lowerTrackIndexBound = handleClip.track.index - minSelectedTrackIndex;
    this.upperTrackIndexBound = maxIndex - (maxSelectedTrackIndex - handleClip.track.index);
  }

  @action
  endDrag() {
    const { handleClip, dropTargetTimelinePosition } = this;
    if (dropTargetTimelinePosition) {
      const { selectedClips } = this.clipSelect;
      const deltaTimeline = dropTargetTimelinePosition.subtract(handleClip.position);
      this.clipMoveService.moveClips(selectedClips, deltaTimeline);
    }

    this.isDragging = false;
    this.relativePositions.clear();
  }
}
