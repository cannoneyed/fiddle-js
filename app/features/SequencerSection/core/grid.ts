import { GridLayoutBase } from 'core/state/layouts/shared/grid';

import { Timeline } from './timeline';
import { ZoomState } from './zoom';

export class GridLayout extends GridLayoutBase {
  constructor(protected timelineState: Timeline, protected zoomLayout: ZoomState) {
    super();
  }
}
