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
  get sectionHeight() {
    return this.mainPageLayout.sequencerSectionHeight;
  }

  @computed
  get sectionWidth() {
    return this.mainPageLayout.sectionWidth;
  }

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;

  @observable verticalScrollbarWidth = 14;

  @computed
  get tracksAreaDimensions(): Dimensions {
    return {
      height: this.sectionHeight - this.toolbarHeight - this.minimapHeight - this.timelineHeight,
      width: this.mainPageLayout.sectionWidth - this.verticalScrollbarWidth,
    };
  }

  @computed
  get tracksAreaPosition(): Position {
    return {
      left: this.gutterWidth,
      top: this.toolbarHeight + this.minimapHeight + this.timelineHeight,
    };
  }

  @computed
  get tracksAreaRectangle(): Rectangle {
    return { ...this.tracksAreaDimensions, ...this.tracksAreaPosition };
  }

  @computed
  get gridDimensions(): Dimensions {
    return {
      height: this.tracksAreaDimensions.height,
      width: this.tracksAreaDimensions.width - this.gutterWidth,
    };
  }

  @computed
  get gridPosition(): Position {
    return {
      top: this.tracksAreaPosition.top,
      left: this.gutterWidth,
    };
  }

  @computed
  get gridRectangle(): Rectangle {
    return { ...this.gridDimensions, ...this.gridPosition };
  }

  @computed
  get verticalScrollbarDimensions(): Dimensions {
    return {
      height: this.sectionHeight - this.toolbarHeight - this.minimapHeight,
      width: this.verticalScrollbarWidth,
    };
  }

  @computed
  get verticalScrollbarPosition(): Position {
    return {
      left: 0,
      top: this.toolbarHeight + this.minimapHeight,
    };
  }

  @computed
  get verticalScrollbarRectangle(): Rectangle {
    return { ...this.verticalScrollbarDimensions, ...this.verticalScrollbarPosition };
  }

  @computed
  get tracksWidth() {
    return this.tracksAreaRectangle.width - this.gutterWidth;
  }
}

export { Rectangle };
