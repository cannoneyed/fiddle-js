// import { createMandatoryContext, makeCoreInjector } from 'utils/context';
import { action } from 'mobx';

import { EnvelopeEditorInteractions } from './interactions';
import { EnvelopeEditorLayout } from './layout';

import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Props } from 'features/EnvelopeEditor';

export class EnvelopeEditorCore {
  constructor(public envelope: Envelope) {}

  interactions = new EnvelopeEditorInteractions(this);
  layout = new EnvelopeEditorLayout(this);

  snapToGrid = new SnapToGrid();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
    this.snapToGrid = props.snapToGrid;
  }
}

const coreRegister = new Map<Envelope, EnvelopeEditorCore>();
export function getCore(envelope: Envelope) {
  const core = coreRegister.has(envelope)
    ? coreRegister.get(envelope)!
    : new EnvelopeEditorCore(envelope);
  coreRegister.set(envelope, core);
  return core;
}
// const { Provider, Consumer } = createMandatoryContext<EnvelopeEditorCore>();
// export { Provider, Consumer };

// export const injectCore = makeCoreInjector(Consumer);
