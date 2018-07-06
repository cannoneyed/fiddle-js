import { action, observable } from 'mobx';
import { Inject, Service } from 'typedi';
import { filterMethods } from 'utils/log-filter';

import { computed } from 'mobx';
import { WindowLayout } from 'core/state/layouts/window';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

export const enum SectionType {
  sequencer = 'sequencer',
  clipEditor = 'clipEditor',
}

@Service()
export class MainPageLayout {
  static mobxLoggerConfig = filterMethods('deltaSectionDivider');

  @Inject(type => SequencerSectionLayout)
  sequencerSectionLayout: SequencerSectionLayout;

  @Inject(type => WindowLayout)
  windowLayout: WindowLayout;

  topSection: SectionType | null = SectionType.sequencer;
  bottomSection: SectionType | null = SectionType.clipEditor;

  @observable minimapHeight = 30;
  @observable gutterWidth = 100;
  @observable timelineHeight = 30;
  @observable toolbarHeight = 40;
  @observable tracksAreaHeight = 400;

  @observable tracksVerticalScrollbarWidth = 14;

  getSectionWidth() {
    return this.windowLayout.width;
  }

  @computed
  get sequencerSectionHeight() {
    return this.timelineHeight + this.tracksAreaHeight;
  }

  @computed
  get tracksSectionWidth() {
    const { tracksVerticalScrollbarWidth } = this;
    return this.windowLayout.width - tracksVerticalScrollbarWidth;
  }

  @computed
  get editSectionHeight() {
    const { tracksAreaHeight, timelineHeight, minimapHeight, toolbarHeight } = this;
    const sum = tracksAreaHeight + timelineHeight + minimapHeight + toolbarHeight;
    return this.windowLayout.height - sum;
  }

  @computed
  get tracksAreaWidth() {
    return this.windowLayout.width - this.gutterWidth;
  }

  @computed
  get tracksAreaLeft() {
    return this.gutterWidth;
  }

  @computed
  get tracksAreaTop() {
    return this.toolbarHeight + this.minimapHeight + this.timelineHeight;
  }

  @action
  deltaSectionDivider(deltaY: number) {
    this.tracksAreaHeight += deltaY;
  }
}
