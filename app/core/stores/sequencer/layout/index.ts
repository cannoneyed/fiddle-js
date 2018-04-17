import { observable } from 'mobx';

import { computed } from 'mobx';
import { windowStore } from 'core/stores/window';

export class SequencerLayout {
  @observable minimapHeight = 60;
  @observable gutterWidth = 200;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;
  @observable tracksAreaHeight = 500;

  @observable tracksVerticalScrollbarWidth = 14;

  @computed
  get workspaceAreaHeight() {
    return this.timelineHeight + this.tracksAreaHeight;
  }

  @computed
  get workspaceAreaWidth() {
    const { tracksVerticalScrollbarWidth } = this;
    return windowStore.width - tracksVerticalScrollbarWidth;
  }

  @computed
  get editAreaHeight() {
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
}

export const sequencerLayout = new SequencerLayout();
