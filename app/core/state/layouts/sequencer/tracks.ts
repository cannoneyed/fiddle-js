import { Service } from 'typedi';
import { action, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';
import { filterMethods } from 'utils/log-filter';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TimelineState } from 'core/state/app/sequencer/timeline';
import { TrackStore } from 'core/state/stores/tracks';

import { GridLayout } from './grid';
import { ZoomLayout } from './zoom';

@Service()
export class TracksLayout {
  static mobxLoggerConfig = filterMethods('setTracksScroll');

  constructor(
    private gridLayout: GridLayout,
    private sectionLayout: SequencerSectionLayout,
    private trackStore: TrackStore,
    private timelineState: TimelineState,
    private zoomLayout: ZoomLayout
  ) {}

  @observable tracksScrollPercentX = 0;
  @observable tracksScrollPercentY = 0;

  @action.bound
  setTracksScroll = (tracksScroll: { x?: number; y?: number }) => {
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
    return this.timelineState.length * this.gridLayout.barWidth;
  }

  @computed
  get tracksHeight() {
    return this.trackHeight * this.trackStore.trackList.length;
  }

  @computed
  get tracksScrollableWidth() {
    return this.trackWidth - this.sectionLayout.tracksWidth;
  }

  @computed
  get tracksScrollableHeight() {
    return this.tracksHeight - this.sectionLayout.tracksAreaRectangle.height;
  }

  @computed
  get tracksViewPercentX() {
    const { tracksWidth } = this.sectionLayout;
    return clamp(tracksWidth / this.trackWidth, 0, 1);
  }

  @computed
  get tracksViewPercentY() {
    const { height } = this.sectionLayout.tracksAreaRectangle;
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
}
