import { Inject, Service } from 'typedi';
import { observable } from 'mobx';

import { MainPageLayout } from 'core/state/layouts/pages/main';
import { SectionLayout } from 'core/state/layouts/shared/section';

@Service()
export class ClipEditorSectionLayout implements SectionLayout {
  @Inject(type => MainPageLayout)
  mainPageLayout: MainPageLayout;

  @observable sectionHeight = 400;
  @observable sectionWidth = 400;
}
