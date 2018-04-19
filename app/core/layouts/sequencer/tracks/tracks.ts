import { Container, Service } from 'typedi';
import { action, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import * as defaults from 'defaults/view';

import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { timelineState } from 'core/stores/sequencer/timeline';
import { trackStore } from 'core/stores/tracks';

import { GridLayout } from './grid';
import { ZoomLayout } from './zoom';

interface ISetTracksScroll {
  x?: number;
  y?: number;
}

@Service()
export class TracksLayout {
  static mobxLoggerConfig = getMobxLoggerConfig();

  gridLayout = Container.get(GridLayout);
  sequencerPageLayout = Container.get(SequencerPageLayout);
  zoomLayout = Container.get(ZoomLayout);

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
    return this.trackHeight * trackStore.trackList.length;
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
    return tracksAreaWidth / this.trackWidth;
  }

  @computed
  get tracksScrolledX() {
    return this.tracksScrollableWidth * this.tracksScrollPercentX;
  }

  @computed
  get tracksViewPercentY() {
    const { tracksAreaHeight } = this.sequencerPageLayout;
    return tracksAreaHeight / this.tracksHeight;
  }

  @computed
  get tracksScrolledY() {
    return this.tracksScrollableHeight * this.tracksScrollPercentY;
  }
}

function getMobxLoggerConfig() {
  return {
    methods: {
      setTracksScroll: false,
    },
  };
}
