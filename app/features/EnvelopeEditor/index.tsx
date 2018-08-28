import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';
import { Timeline } from 'core/models/timeline';

import { getState } from 'features/EnvelopeEditor/core';

import Layout from 'features/EnvelopeEditor/components/Layout';

export interface Props {
  dimensions: Dimensions;
  envelope: Envelope;
  snapToGrid: SnapToGrid;
  timeline: Timeline;
}
interface State {}

@observer
export class EnvelopeEditor extends React.Component<Props, State> {
  state = {};

  static getDerivedStateFromProps(props: Props) {
    const { envelope } = props;
    const state = getState(envelope);
    state.updateFromProps(props);
    return {};
  }

  render() {
    return <Layout envelope={this.props.envelope} />;
  }
}

export default EnvelopeEditor;
