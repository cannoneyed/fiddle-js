import { Service } from 'typedi';
import { action, autorun, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';
import { filterMethods } from 'utils/log-filter';

import { SequencerState } from 'features/SequencerSection/core/state';
import { GridLayout } from 'features/SequencerSection/core/grid';
import { SequencerLayout } from 'features/SequencerSection/core/layout';
import { Timeline } from 'features/SequencerSection/core/timeline';
import { TrackStore } from 'core/state/stores/tracks';

import { Dimensions } from 'core/interfaces';

@Service()
export class TracksLayout {
  static mobxLoggerConfig = filterMethods('resetScrollOnResize', 'setTracksScroll');

  constructor(
    private sequencerState: SequencerState,
    private gridLayout: GridLayout,
    private sectionLayout: SequencerLayout,
    private timeline: Timeline,
    private trackStore: TrackStore
  ) {
    // We need to observe when the view percent has changed to 1, meaning the viewport has grown to be larger
    // than all contained tracks, and reset scroll to 0 so the tracks reset to the top of the viewport.
    autorun(() => {
      if (this.tracksViewPercentY >= 1) {
        this.resetScrollOnResize(this.scrollPercentX, 0);
      }
      if (this.tracksViewPercentX >= 1) {
        this.resetScrollOnResize(0, this.scrollPercentY);
      }
    });
  }

  @action
  private resetScrollOnResize(x: number, y: number) {
    this.scrollPercentX = x;
    this.scrollPercentY = y;
  }

  @observable
  scrollPercentX = 0;
  @observable
  scrollPercentY = 0;

  @action
  setTracksScroll = (tracksScroll: { x?: number; y?: number }) => {
    const { x = this.scrollPercentX, y = this.scrollPercentY } = tracksScroll;
    this.scrollPercentX = clamp(x, 0, 1);
    this.scrollPercentY = clamp(y, 0, 1);
  };

  @computed
  get trackHeight() {
    return this.sequencerState.zoom.vertical.level * defaults.trackHeight;
  }

  @computed
  get trackWidth() {
    return this.timeline.length.primary * this.gridLayout.barWidth;
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
    return Math.max(this.trackWidth - this.sectionLayout.tracksDimensions.width, 0);
  }

  @computed
  get tracksScrollableHeight() {
    return Math.max(this.tracksHeight - this.sectionLayout.tracksDimensions.height, 0);
  }

  @computed
  get tracksViewPercentX() {
    const tracksWidth = this.sectionLayout.tracksDimensions.width;
    return clamp(tracksWidth / this.trackWidth, 0, 1);
  }

  @computed
  get tracksViewPercentY() {
    const { height } = this.sectionLayout.tracksDimensions;
    return clamp(height / this.tracksHeight, 0, 1);
  }

  @computed
  get tracksScrolledX() {
    return this.tracksScrollableWidth * this.scrollPercentX;
  }

  @computed
  get tracksScrolledY() {
    return this.tracksScrollableHeight * this.scrollPercentY;
  }

  @computed
  get tracksViewportDimensions(): Dimensions {
    return {
      height: Math.max(this.sectionLayout.tracksDimensions.height, this.tracksHeight),
      width: Math.max(this.sectionLayout.tracksDimensions.width, this.trackWidth),
    };
  }
}
