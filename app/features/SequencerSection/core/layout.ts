import { Service } from 'typedi';
import { action, computed, observable } from 'mobx';

import { Dimensions, Position, Rectangle } from 'core/interfaces';

@Service()
export class SequencerLayout {
  @observable
  dimensions = {
    height: 0,
    width: 0,
  };

  @action
  setDimensions(dimensions: Dimensions) {
    this.dimensions = dimensions;
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
      width: dimensions.width - this.gutterWidth - this.verticalScrollbarWidth,
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
