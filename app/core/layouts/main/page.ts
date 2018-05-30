import { observable, action } from 'mobx';
import { Service } from 'typedi';
import { filterMethods } from 'utils/log-filter';

import { computed } from 'mobx';
import { WindowLayout } from 'core/layouts/window';

@Service()
export class MainPageLayout {
  static mobxLoggerConfig = filterMethods('deltaTracksAreaHeight');

  constructor(private windowLayout: WindowLayout) {}

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
    return this.windowLayout.width - tracksVerticalScrollbarWidth;
  }

  @computed
  get editSectionHeight() {
    const { tracksAreaHeight, timelineHeight, minimapHeight, toolbarHeight } = this;
    const sum = tracksAreaHeight + timelineHeight + minimapHeight + toolbarHeight;
    return this.windowLayout.height - sum;
  }

  @computed
  get tracksAreaWidth() {
    return this.windowLayout.width - this.gutterWidth;
  }

  @computed
  get tracksAreaLeft() {
    return this.gutterWidth;
  }

  @computed
  get tracksAreaTop() {
    return this.toolbarHeight + this.minimapHeight + this.timelineHeight;
  }

  @action
  deltaTracksAreaHeight(deltaHeight: number) {
    this.tracksAreaHeight += deltaHeight;
  }
}
