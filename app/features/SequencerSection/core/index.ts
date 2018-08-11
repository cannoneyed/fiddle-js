import { createMandatoryContext, makeCoreInjector } from 'utils/context';
import { SequencerSectionLayout } from './layout';

import { SnapToGrid } from 'core/models/snap-to-grid';

export class SequencerSectionCore {
  layout = new SequencerSectionLayout();

  snapToGrid = new SnapToGrid();
}

const { Provider, Consumer } = createMandatoryContext<SequencerSectionCore>();
export { Provider, Consumer };

export const injectCore = makeCoreInjector(Consumer);
