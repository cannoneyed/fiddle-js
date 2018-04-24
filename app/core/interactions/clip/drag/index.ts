import { action, observable } from 'mobx';
import { Service } from 'typedi';
import { logMethods } from 'utils/log-filter';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipSelect } from 'core/interactions/clip/select';
import { ClipMoveService } from 'core/services/sequencer/clip-move';
import { TracksPositionService } from 'core/services/sequencer/position/tracks';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';
import { GridService } from 'core/services/sequencer/grid';

export const DRAG_DELAY: number = 200;

@Service()
export class ClipDragInteraction {
  static mobxLoggerConfig = logMethods('beginDrag', 'endDrag');

  constructor(
    private clipSelect: ClipSelect,
    private clipMoveService: ClipMoveService,
    private gridService: GridService,
    private tracksPositionService: TracksPositionService,
    private tracksMouseInteraction: TracksMouseInteraction
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
  @observable dropTargetTrackId: string | null;

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = true;
  }

  @action
  setDropTargetTimelinePosition(position: TimelineVector) {
    this.dropTargetTimelinePosition = position;
  }

  @action
  setDropTargetTrackId(trackId: string | null) {
    this.dropTargetTrackId = trackId;
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

    const x = this.startX + this.deltaX;

    // Compute the timeline position where the clip is being dragged to
    const offsetX = this.tracksPositionService.getOffsetXFromScreenX(x);
    const snapToGridPosition = this.gridService.getNearestSnapPosition(offsetX);
    this.setDropTargetTimelinePosition(snapToGridPosition);

    const dropTargetTrack = this.tracksMouseInteraction.trackMouseOver;
    const dropTargetTrackId = dropTargetTrack ? dropTargetTrack.id : null;
    this.setDropTargetTrackId(dropTargetTrackId);
  }

  @action.bound
  beginDrag(handleClip: Clip) {
    this.isDragging = true;
    this.handleClip = handleClip;

    // Set the position of the handled clip to relatively position the other selected clips on the
    // DraggedClips container div
    this.handleClipScreenPosition = handleClip.getScreenVector();

    // Set the relative screen positions of the other selected clips, so that they can be positioned
    // correctly in the DraggedClips container div
    const { selectedClips } = this.clipSelect;

    selectedClips.forEach(selectedClip => {
      const clipScreenPosition = selectedClip.getScreenVector();
      const relativePosition = clipScreenPosition.subtract(this.handleClipScreenPosition);
      this.relativePositions.set(selectedClip.id, relativePosition);
    });
  }

  getRelativePosition(clip: Clip) {
    const { id } = clip;
    const relativePosition = this.relativePositions.get(id);
    return relativePosition || new ScreenVector();
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
