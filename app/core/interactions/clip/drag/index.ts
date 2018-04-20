import { action, computed, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { logMethods } from 'utils/log-filter';

import { Clip } from 'core/models/clip';
import { ScreenVector } from 'core/primitives/screen-vector';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { ClipSelect } from 'core/interactions/clip/select';

export const DRAG_DELAY: number = 200;

@Service()
export class ClipDragInteraction {
  static mobxLoggerConfig = logMethods('beginDrag', 'endDrag');

  @Inject(type => ClipSelect)
  clipSelect: ClipSelect;

  @observable isDragging: boolean = false;

  @observable deltaX: number = 0;
  @observable deltaY: number = 0;

  @observable startX: number;
  @observable startY: number;

  @observable handleClip: Clip;
  @observable handleClipScreenPosition: ScreenVector;
  @observable relativePositions = observable.map<string, ScreenVector>({});

  @observable dropTargetPosition: TimelineVector | null;
  @observable dropTargetTrack: string | null;

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = true;
  }

  @computed
  get draggedClipsPosition() {
    const { x, y } = this.handleClipScreenPosition;
    return {
      x: x + this.deltaX,
      y: y + this.deltaY,
    };
  }

  @action
  setDropTargetPosition(position: TimelineVector) {
    this.dropTargetPosition = position;
  }

  @action
  setStartPosition(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }

  @action
  setDelta(x: number, y: number) {
    this.deltaX = x;
    this.deltaY = y;
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
    this.isDragging = false;
    this.relativePositions.clear();
  }
}
