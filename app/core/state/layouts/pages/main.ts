import { action, computed, observable } from 'mobx';
import { createTransformer } from 'mobx-utils';
import { Service, Inject } from 'typedi';
import { filterMethods } from 'utils/log-filter';

import { WindowLayout } from 'core/state/layouts/window';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { ClipEditorSectionLayout } from 'core/state/layouts/clip-editor/section';

@Service()
export class MainPageLayout {
  static mobxLoggerConfig = filterMethods('deltaSectionDivider');

  @Inject(type => SequencerSectionLayout)
  sequencerSectionLayout: SequencerSectionLayout;

  @Inject(type => ClipEditorSectionLayout)
  clipEditorSectionLayout: ClipEditorSectionLayout;

  constructor(private windowLayout: WindowLayout) {}

  // TODO: Figure out a more elegant way to support dynamic / rescale sizes of sections
  @observable sequencerSectionHeight = 800;

  @computed
  get clipEditorSectionHeight() {
    return this.windowLayout.height - this.sequencerSectionHeight;
  }

  @action
  deltaSectionDivider(deltaY: number) {
    this.sequencerSectionHeight += deltaY;
  }

  @computed
  get sectionWidth() {
    return this.windowLayout.width;
  }

  getSectionHeight = createTransformer(() => {
    return 1;
  });
}
