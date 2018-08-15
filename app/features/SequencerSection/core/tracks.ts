import { Container } from 'typedi';
import { action, autorun, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';
import { filterMethods } from 'utils/log-filter';

import { TrackStore } from 'core/state/stores/tracks';
import { SequencerCore } from './index';

import { Dimensions } from 'core/interfaces';

export class TracksLayout {
  static mobxLoggerConfig = filterMethods('resetScrollOnResize', 'setTracksScroll');

  private trackStore = Container.get(TrackStore);

  constructor(private core: SequencerCore) {
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
    return this.core.zoom.vertical.level * defaults.trackHeight;
  }

  @computed
  get trackWidth() {
    return this.core.timeline.length.primary * this.core.grid.barWidth;
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
    return Math.max(this.trackWidth - this.core.layout.tracksDimensions.width, 0);
  }

  @computed
  get tracksScrollableHeight() {
    return Math.max(this.tracksHeight - this.core.layout.tracksDimensions.height, 0);
  }

  @computed
  get tracksViewPercentX() {
    const tracksWidth = this.core.layout.tracksDimensions.width;
    return clamp(tracksWidth / this.trackWidth, 0, 1);
  }

  @computed
  get tracksViewPercentY() {
    const { height } = this.core.layout.tracksDimensions;
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
      height: Math.max(this.core.layout.tracksDimensions.height, this.tracksHeight),
      width: Math.max(this.core.layout.tracksDimensions.width, this.trackWidth),
    };
  }

  @action
  private resetScrollOnResize(x: number, y: number) {
    this.scrollPercentX = x;
    this.scrollPercentY = y;
  }
}
