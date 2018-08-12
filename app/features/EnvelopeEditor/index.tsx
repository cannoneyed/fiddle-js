import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { EnvelopeEditorCore, getCore } from 'features/EnvelopeEditor/core';

import Layout from 'features/EnvelopeEditor/components/Layout';

export interface Props {
  dimensions: Dimensions;
  envelope: Envelope;
  snapToGrid: SnapToGrid;
}

interface State {
  core: EnvelopeEditorCore;
}

@observer
export class EnvelopeEditor extends React.Component<Props, State> {
  state = {} as State;

  static getDerivedStateFromProps(props: Props) {
    const { envelope } = props;
    const core = getCore(envelope);
    core.updateFromProps(props);
    return { core };
  }

  render() {
    return <Layout envelope={this.props.envelope} />;
  }
}

export default EnvelopeEditor;
