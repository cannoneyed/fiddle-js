import { Inject, Service } from 'libs/typedi';
import { GridLayoutBase } from 'core/state/layouts/shared/grid';

import { Timeline, ZoomLayout } from 'features/Sequencer/core';

@Service()
export default class __GridLayout extends GridLayoutBase {
  @Inject(type => ZoomLayout)
  protected zoomLayout: ZoomLayout;

  @Inject(type => Timeline)
  protected timelineLayout: Timeline;
}
