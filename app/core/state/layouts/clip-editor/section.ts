import { Inject, Service } from 'typedi';
import { computed, observable } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';
import { SectionLayout } from 'core/state/layouts/shared/section';

import { Dimensions, Rectangle, Position } from 'core/interfaces';

@Service()
export class ClipEditorSectionLayout implements SectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;

  @observable verticalScrollbarWidth = 14;

  @computed
  get sectionHeight() {
    return this.mainPageLayout.clipEditorSectionHeight;
  }

  @computed
  get sectionWidth() {
    return this.mainPageLayout.sectionWidth;
  }

  @computed
  get editAreaDimensions(): Dimensions {
    return {
      height: this.sectionHeight - this.toolbarHeight,
      width: this.mainPageLayout.sectionWidth - this.verticalScrollbarWidth,
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
}

export { Dimensions };
