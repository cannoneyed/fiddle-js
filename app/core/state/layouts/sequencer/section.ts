import { Inject, Service } from 'typedi';
import { observable } from 'mobx';

import { computed } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';
import { SectionLayout } from 'core/state/layouts/shared/section';

export interface Dimensions {
  height: number;
  width: number;
  left: number;
  top: number;
}

@Service()
export class SequencerSectionLayout implements SectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  @observable sectionHeight = 800;
  @observable sectionWidth = 800;

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;

  @observable tracksVerticalScrollbarWidth = 14;

  @computed
  get tracksAreaDimensions(): Dimensions {
    return {
      height: this.sectionHeight - this.toolbarHeight - this.minimapHeight - this.timelineHeight,
      width: this.mainPageLayout.getSectionWidth() - this.tracksVerticalScrollbarWidth,
      left: this.gutterWidth,
      top: this.toolbarHeight + this.minimapHeight + this.timelineHeight,
    };
  }

  @computed
  get verticalScrollbarDimensions(): Dimensions {
    return {
      height: this.sectionHeight - this.toolbarHeight - this.minimapHeight,
      width: this.tracksVerticalScrollbarWidth,
      left: 0,
      top: this.toolbarHeight + this.minimapHeight,
    };
  }

  @computed
  get tracksWidth() {
    return this.tracksAreaDimensions.width - this.gutterWidth;
  }
}
