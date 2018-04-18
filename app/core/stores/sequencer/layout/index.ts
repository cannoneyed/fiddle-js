import { observable, action } from 'mobx';

import { computed } from 'mobx';
import { windowStore } from 'core/stores/window';

export class SequencerLayout {
  static mobxLoggerConfig = {
    methods: {
      deltaTracksAreaHeight: false,
    },
  };

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;
  @observable tracksAreaHeight = 400;

  @observable tracksVerticalScrollbarWidth = 14;

  @computed
  get tracksSectionHeight() {
    return this.timelineHeight + this.tracksAreaHeight;
  }

  @computed
  get tracksSectionWidth() {
    const { tracksVerticalScrollbarWidth } = this;
    return windowStore.width - tracksVerticalScrollbarWidth;
  }

  @computed
  get editSectionHeight() {
    const { tracksAreaHeight, timelineHeight, minimapHeight, toolbarHeight } = this;
    const sum = tracksAreaHeight + timelineHeight + minimapHeight + toolbarHeight;
    return windowStore.height - sum;
  }

  @computed
  get tracksAreaWidth() {
    return windowStore.width - this.gutterWidth;
  }

  @computed
  get tracksAreaLeft() {
    return this.gutterWidth;
  }

  @action
  deltaTracksAreaHeight(deltaHeight: number) {
    this.tracksAreaHeight += deltaHeight;
  }
}

export const sequencerLayout = new SequencerLayout();
