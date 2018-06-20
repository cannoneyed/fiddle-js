import { Service } from 'typedi';

import { TimelineState } from 'core/state/app/clip-editor/timeline';

import { ZoomLayout } from './zoom';
import { GridLayoutBase } from '../shared/grid';

@Service()
export class GridLayout extends GridLayoutBase {
  constructor(protected timelineState: TimelineState, protected zoomLayout: ZoomLayout) {
    super();
  }
}
