import { Inject, Service } from 'typedi';
import { action, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';
import { filterMethods } from 'utils/log-filter';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { timelineState } from 'core/stores/sequencer/timeline';
import { TrackStore } from 'core/stores/tracks';

import { GridLayout } from './grid';
import { ZoomLayout } from './zoom';

interface ISetTracksScroll {
  x?: number;
  y?: number;
}

@Service()
export class TracksLayout {
  static mobxLoggerConfig = filterMethods('setTracksScroll');

  @Inject(type => ClipDragInteraction)
  clipDragInteraction: ClipDragInteraction;
  @Inject(type => TrackStore)
  trackStore: TrackStore;
  @Inject(type => GridLayout)
  gridLayout: GridLayout;
  @Inject(type => SequencerPageLayout)
  sequencerPageLayout: SequencerPageLayout;
  @Inject(type => ZoomLayout)
  zoomLayout: ZoomLayout;

  @observable tracksScrollPercentX = 0;
  @observable tracksScrollPercentY = 0;

  @action.bound
  setTracksScroll = (tracksScroll: ISetTracksScroll) => {
    const { x, y } = tracksScroll;
    if (x !== undefined) {
      this.tracksScrollPercentX = clamp(x, 0, 1);
    }
    if (y !== undefined) {
      this.tracksScrollPercentY = clamp(y, 0, 1);
    }
  };

  // Computed Fields
  @computed
  get trackHeight() {
    return this.zoomLayout.vertical.level * defaults.trackHeight;
  }

  @computed
  get trackWidth() {
    return timelineState.length * this.gridLayout.barWidth;
  }

  @computed
  get tracksHeight() {
    return this.trackHeight * this.trackStore.trackList.length;
  }

  @computed
  get tracksScrollableWidth() {
    return this.trackWidth - this.sequencerPageLayout.tracksAreaWidth;
  }

  @computed
  get tracksScrollableHeight() {
    return this.tracksHeight - this.sequencerPageLayout.tracksAreaHeight;
  }

  @computed
  get tracksViewPercentX() {
    const { tracksAreaWidth } = this.sequencerPageLayout;
    return clamp(tracksAreaWidth / this.trackWidth, 0, 1);
  }

  @computed
  get tracksViewPercentY() {
    const { tracksAreaHeight } = this.sequencerPageLayout;
    return clamp(tracksAreaHeight / this.tracksHeight, 0, 1);
  }

  @computed
  get tracksScrolledX() {
    return this.tracksScrollableWidth * this.tracksScrollPercentX;
  }

  @computed
  get tracksScrolledY() {
    return this.tracksScrollableHeight * this.tracksScrollPercentY;
  }

  @computed
  get dropTargetPosition() {
    return this.clipDragInteraction.isDragging
      ? this.clipDragInteraction.dropTargetTimelinePosition
      : null;
  }
}
