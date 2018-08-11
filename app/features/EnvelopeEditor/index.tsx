import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { EnvelopeEditorCore, Provider } from 'features/EnvelopeEditor/core';

import Layout from 'features/EnvelopeEditor/components/Layout';

interface Props {
  dimensions: Dimensions;
  envelope: Envelope;
  snapToGrid: SnapToGrid;
}

@observer
export class EnvelopeEditor extends React.Component<Props> {
  core: EnvelopeEditorCore;

  constructor(props: Props) {
    super(props);
    const { dimensions, envelope, snapToGrid } = props;
    this.core = new EnvelopeEditorCore(envelope);
    this.core.layout.dimensions = dimensions;
    this.core.snapToGrid = snapToGrid;
  }

  render() {
    return (
      <Provider value={this.core}>
        <Layout />
      </Provider>
    );
  }
}

export default EnvelopeEditor;
