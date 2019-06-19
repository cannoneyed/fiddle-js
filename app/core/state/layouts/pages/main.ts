import { action, computed, observable } from 'mobx';
import { Inject, Service } from 'libs/typedi';
import { filterMethods } from 'utils/log-filter';

import { Dimensions } from 'core/interfaces';

import { WindowLayout } from 'core';

@Service()
export default class __MainPageLayout {
  static mobxLoggerConfig = filterMethods('deltaSectionDivider');

  @Inject(type => WindowLayout)
  private windowLayout: WindowLayout;

  // TODO: Figure out a more elegant way to support dynamic / rescale sizes of sections
  @observable
  sequencerSectionHeight = 800;

  @computed
  get sequencerDimensions(): Dimensions {
    return {
      height: this.sequencerSectionHeight,
      width: this.sectionWidth,
    };
  }

  @computed
  get clipEditorDimensions(): Dimensions {
    return {
      height: this.windowLayout.height - this.sequencerSectionHeight,
      width: this.sectionWidth,
    };
  }

  @action
  deltaSectionDivider = (deltaY: number) => {
    this.sequencerSectionHeight += deltaY;
  };

  @computed
  get sectionWidth() {
    return this.windowLayout.width;
  }
}
