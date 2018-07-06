import { action } from 'mobx';
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

  @action
  deltaSectionDivider(deltaY: number) {
    this.sequencerSectionLayout.sectionHeight += deltaY;
  }

  getSectionWidth() {
    return this.windowLayout.width;
  }
}
