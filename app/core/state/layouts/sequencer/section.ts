import { Inject, Service } from 'typedi';
import { observable, action } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { computed } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';

@Service()
export class SequencerSectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  static mobxLoggerConfig = filterMethods('deltaTracksAreaHeight');

  @observable sectionHeight = 300;

  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;
  @observable tracksAreaHeight = 400;

  @observable tracksVerticalScrollbarWidth = 14;

  @computed
  get tracksAreaWidth() {
    // return this.mainPageLayout.sectionsWidth - this.gutterWidth;
    return 0;
  }

  @computed
  get tracksAreaLeft() {
    return this.gutterWidth;
  }

  @computed
  get tracksAreaTop() {
    return 0;
    // return this.toolbarHeight + this.timelineHeight;
  }

  @action
  deltaTracksAreaHeight(deltaHeight: number) {
    this.tracksAreaHeight += deltaHeight;
  }
}
