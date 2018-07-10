import { Service } from 'typedi';
import { action, autorun, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';
import { filterMethods } from 'utils/log-filter';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TimelineState } from 'core/state/app/sequencer/timeline';
import { TrackStore } from 'core/state/stores/tracks';

import { Dimensions } from 'core/interfaces';

import { GridLayout } from './grid';
import { ZoomLayout } from './zoom';

@Service()
export class TracksLayout {
  static mobxLoggerConfig = filterMethods('resetScrollOnResize', 'setTracksScroll');

  constructor(
    private gridLayout: GridLayout,
    private sectionLayout: SequencerSectionLayout,
    private trackStore: TrackStore,
    private timelineState: TimelineState,
    private zoomLayout: ZoomLayout
  ) {
    // We need to observe when the view percent has changed to 1, meaning the viewport has grown to be larger
    // than all contained tracks, and reset scroll to 0 so the tracks reset to the top of the viewport.
    autorun(() => {
      if (this.tracksViewPercentY >= 1) {
        this.resetScrollOnResize(this.tracksScrollPercentX, 0);
      }
      if (this.tracksViewPercentX >= 1) {
        this.resetScrollOnResize(0, this.tracksScrollPercentY);
      }
    });
  }

  @observable tracksScrollPercentX = 0;
  @observable tracksScrollPercentY = 0;

  @action
  setTracksScroll = (tracksScroll: { x?: number; y?: number }) => {
    const { x = this.tracksScrollPercentX, y = this.tracksScrollPercentY } = tracksScroll;
    this.tracksScrollPercentX = clamp(x, 0, 1);
    this.tracksScrollPercentY = clamp(y, 0, 1);
  };

  // Computed Fields
  @computed
  get trackHeight() {
    return this.zoomLayout.vertical.level * defaults.trackHeight;
  }

  @computed
  get trackWidth() {
    return this.timelineState.length * this.gridLayout.barWidth;
  }

  @computed
  get tracksHeight() {
    return this.trackHeight * this.trackStore.trackList.length;
  }

  @computed
  get tracksDimensions(): Dimensions {
    return {
      height: this.tracksHeight,
      width: this.trackWidth,
    };
  }

  @computed
  get tracksScrollableWidth() {
    return Math.max(this.trackWidth - this.sectionLayout.tracksWidth, 0);
  }

  @computed
  get tracksScrollableHeight() {
    return Math.max(this.tracksHeight - this.sectionLayout.tracksAreaDimensions.height, 0);
  }

  @computed
  get tracksViewPercentX() {
    const { tracksWidth } = this.sectionLayout;
    return clamp(tracksWidth / this.trackWidth, 0, 1);
  }

  @computed
  get tracksViewPercentY() {
    const { height } = this.sectionLayout.tracksAreaDimensions;
    return clamp(height / this.tracksHeight, 0, 1);
  }

  @computed
  get tracksScrolledX() {
    return this.tracksScrollableWidth * this.tracksScrollPercentX;
  }

  @computed
  get tracksScrolledY() {
    return this.tracksScrollableHeight * this.tracksScrollPercentY;
  }

  @action
  private resetScrollOnResize(x: number, y: number) {
    this.tracksScrollPercentX = x;
    this.tracksScrollPercentY = y;
  }
}
