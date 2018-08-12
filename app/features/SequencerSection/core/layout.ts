import { computed, observable } from 'mobx';
import { Container } from 'typedi';

import { Dimensions, Position, Rectangle } from 'core/interfaces';

import { MainPageLayout } from 'core/state/layouts/pages/main';

export class SequencerLayout {
  mainPageLayout = Container.get(MainPageLayout);

  @observable
  dimensions = {
    height: 0,
    width: 0,
  };

  @computed
  get sectionHeight() {
    return this.dimensions.height;
  }

  @computed
  get sectionWidth() {
    return this.dimensions.width;
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
    return this.tracksAreaDimensions.width - this.gutterWidth;
  }
}
