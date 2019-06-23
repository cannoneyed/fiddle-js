import { Inject, Service } from 'libs/typedi';
import { action, observable } from 'mobx';
import { logMethods } from 'utils/log-filter';
// import { clamp, first, last, min, max } from 'lodash';

// import { Clip } from 'core/models/clip';
// import { ScreenVector } from 'core/primitives/screen-vector';
// import { TimelineVector } from 'core/primitives/timeline-vector';

// import { ClipActions, ClipStore, GridService, TrackStore } from 'core';
import {
  //   ClipMoveService,
  //   ClipSelectInteraction,
  SequencerPositionService,
  SequencerState,
  //   TimelineState,
  //   TracksPositionService,
  TracksLayout,
} from 'features/Sequencer/core';

@Service()
export default class PlayheadDragInteraction {
  static mobxLoggerConfig = logMethods('beginDrag', 'endDrag');

  @Inject(type => SequencerPositionService)
  sequencerPositionService: SequencerPositionService;

  @Inject(type => SequencerState)
  sequencerState: SequencerState;

  @Inject(type => TracksLayout)
  tracksLayout: TracksLayout;

  @observable
  isDragging = false;

  startOffsetX = 0;
  startPageX = 0;

  @action
  endDrag = () => {
    this.isDragging = false;
  };

  @action
  computePlayheadPosition(offsetX: number) {
    const timelineOffsetX = offsetX + this.tracksLayout.tracksScrolledX;
    const playheadPosition = this.sequencerState.playheadPosition;
    const nextPosition = this.sequencerPositionService.getTimelineVectorFromOffsetX(
      timelineOffsetX
    );
    if (!nextPosition.equals(playheadPosition)) {
      this.sequencerState.setPlayheadPosition(nextPosition);
    }
  }

  @action
  beginDrag = (mouseDown: MouseEvent) => {
    this.startPageX = mouseDown.pageX;
    this.startOffsetX = mouseDown.offsetX;
    this.isDragging = true;

    this.computePlayheadPosition(mouseDown.offsetX);

    const mouseMove = (mouseMove: MouseEvent): void => {
      const deltaX = mouseMove.pageX - this.startPageX;
      const nextOffsetX = this.startOffsetX + deltaX;
      this.computePlayheadPosition(nextOffsetX);
    };

    const mouseUp = (): void => {
      removeEventHandlers();
      this.endDrag();
    };

    const removeEventHandlers = () => {
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mousemove', mouseMove);
    };

    const addEventHandlers = () => {
      window.addEventListener('mouseup', mouseUp);
      window.addEventListener('mousemove', mouseMove);
    };

    addEventHandlers();
  };
}
