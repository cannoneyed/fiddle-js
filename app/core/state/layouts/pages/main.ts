import { action, computed, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { createTransformer } from 'mobx-utils';
import { filterMethods } from 'utils/log-filter';

import { Dimensions } from 'core/interfaces';

import { WindowLayout } from 'core';

@Service()
export default class __MainPageLayout {
  static mobxLoggerConfig = filterMethods('deltaSectionDivider');

  @Inject(type => WindowLayout)
  private windowLayout: WindowLayout;

  constructor() {
    // TODO: Dealing with some weird context binding issues for mobx observable logging, figure out why the action isn't being bound properly.
    this.deltaSectionDivider = this.deltaSectionDivider.bind(this);
  }

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

  getSectionHeight = createTransformer(() => {
    return 1;
  });
}
