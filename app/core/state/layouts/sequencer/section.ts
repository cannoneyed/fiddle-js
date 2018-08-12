import { Inject, Service } from 'typedi';
import { computed, observable } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';
import { SectionLayout } from 'core/state/layouts/shared/section';
import { Dimensions, Position, Rectangle } from 'core/interfaces';

@Service()
export class SequencerSectionLayout implements SectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  @computed
  get dimensions(): Dimensions {
    return {
      height: this.mainPageLayout.sequencerSectionHeight,
      width: this.mainPageLayout.sectionWidth,
    };
  }

  @observable
  minimapHeight = 30;

  @observable
  gutterWidth = 100;

  @observable
  timelineHeight = 30;

  @observable
  toolbarHeight = 40;

  @observable
  verticalScrollbarWidth = 14;

  @computed
  get tracksStageDimensions(): Dimensions {
    const { dimensions } = this;
    return {
      height: dimensions.height - this.toolbarHeight - this.minimapHeight,
      width: this.mainPageLayout.sectionWidth - this.gutterWidth - this.verticalScrollbarWidth,
    };
  }

  @computed
  get tracksStagePosition(): Position {
    return {
      left: this.gutterWidth,
      top: this.toolbarHeight + this.minimapHeight,
    };
  }

  @computed
  get tracksDimensions(): Dimensions {
    return {
      height: this.tracksStageDimensions.height - this.timelineHeight,
      width: this.tracksStageDimensions.width,
    };
  }

  @computed
  get tracksPosition(): Position {
    return {
      top: this.toolbarHeight + this.minimapHeight + this.timelineHeight,
      left: 0,
    };
  }

  @computed
  get verticalScrollbarDimensions(): Dimensions {
    return {
      height: this.tracksStageDimensions.height,
      width: this.verticalScrollbarWidth,
    };
  }

  @computed
  get verticalScrollbarPosition(): Position {
    return {
      left: this.gutterWidth + this.tracksDimensions.width,
      top: 0,
    };
  }

  @computed
  get verticalScrollbarRectangle(): Rectangle {
    return { ...this.verticalScrollbarDimensions, ...this.verticalScrollbarPosition };
  }
}

export { Rectangle };
