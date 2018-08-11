import { GridLayoutBase } from 'core/state/layouts/shared/grid';

import { TimelineState } from './timeline';
import { ZoomState } from './zoom';

export class GridLayout extends GridLayoutBase {
  constructor(protected timelineState: TimelineState, protected zoomLayout: ZoomState) {
    super();
  }
}
