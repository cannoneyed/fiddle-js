import { Inject, Service } from 'typedi';
import { observable } from 'mobx';

import { computed } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';

@Service()
export class SequencerSectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;
  @observable tracksAreaHeight = 400;

  @observable tracksVerticalScrollbarWidth = 14;

  @computed
  get tracksVerticalScrollbarTop() {
    return this.toolbarHeight + this.minimapHeight;
  }

  @computed
  get sectionHeight() {
    return this.timelineHeight + this.tracksAreaHeight;
  }

  @computed
  get sectionWidth() {
    const sectionWidth = this.mainPageLayout.getSectionWidth();
    return sectionWidth - this.tracksVerticalScrollbarWidth;
  }

  @computed
  get tracksAreaWidth() {
    const sectionWidth = this.mainPageLayout.getSectionWidth();
    return sectionWidth - this.gutterWidth;
  }

  @computed
  get tracksAreaLeft() {
    return this.gutterWidth;
  }

  @computed
  get tracksAreaTop() {
    return this.toolbarHeight + this.minimapHeight + this.timelineHeight;
  }
}
