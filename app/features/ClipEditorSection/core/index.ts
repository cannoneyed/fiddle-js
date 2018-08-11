import { createMandatoryContext, makeCoreInjector } from 'utils/context';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { GridLayout } from './grid';
import { ClipEditorLayout } from './layout';
import { TimelineState } from './timeline';
import { ZoomState } from './zoom';

export class ClipEditorCore {
  constructor(public clip: Clip, private dimensions: Dimensions) {}

  snapToGrid = new SnapToGrid();
  zoom = new ZoomState();
  layout = new ClipEditorLayout(this.dimensions);
  timeline = new TimelineState(this.clip.length);

  grid = new GridLayout(this.timeline, this.zoom);
}

const { Provider, Consumer } = createMandatoryContext<ClipEditorCore>();
export { Provider, Consumer };

export const injectCore = makeCoreInjector(Consumer);
