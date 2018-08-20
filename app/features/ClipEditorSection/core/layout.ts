import { Service } from 'typedi';
import { action, computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';

import { Dimensions, Rectangle, Position } from 'core/interfaces';

import { SectionLayout } from 'core/state/layouts/shared/section';

@Service()
export default class __ClipEditorLayout implements SectionLayout {
  static mobxLoggerConfig = filterMethods('setDimensions');

  @observable
  dimensions: Dimensions;

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
  get editAreaDimensions(): Dimensions {
    const { width, height } = this.dimensions;
    return {
      height: height - this.toolbarHeight,
      width: width - this.gutterWidth - this.verticalScrollbarWidth,
    };
  }

  @computed
  get editAreaPosition(): Position {
    return {
      left: this.gutterWidth,
      top: this.toolbarHeight + this.minimapHeight + this.timelineHeight,
    };
  }

  @computed
  get editAreaRectangle(): Rectangle {
    return { ...this.editAreaDimensions, ...this.editAreaPosition };
  }

  @computed
  get verticalScrollbarDimensions(): Dimensions {
    return {
      height: this.dimensions.height - this.toolbarHeight - this.minimapHeight,
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
}
