import { createMandatoryContext, makeCoreInjector } from 'utils/context';
import { EnvelopeEditorInteractions } from './interactions';
import { EnvelopeEditorLayout } from './layout';

import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

export class EnvelopeEditorCore {
  constructor(public envelope: Envelope) {}

  interactions = new EnvelopeEditorInteractions(this);
  layout = new EnvelopeEditorLayout(this);

  snapToGrid = new SnapToGrid();
}

const { Provider, Consumer } = createMandatoryContext<EnvelopeEditorCore>();
export { Provider, Consumer };

export const injectCore = makeCoreInjector(Consumer);
