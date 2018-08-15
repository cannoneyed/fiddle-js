import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';

import Layout from 'features/SequencerSection/components/Layout';

import { SequencerLayout } from 'features/SequencerSection/core/layout';
import { get } from 'features/SequencerSection/core';

export interface Props {
  dimensions: Dimensions;
}

interface State {}

@observer
export class SequencerSection extends React.Component<Props, State> {
  state = {};

  static getDerivedStateFromProps(props: Props) {
    const { dimensions } = props;
    const layout = get(SequencerLayout);

    // Ensure we update properties on the core
    layout.setDimensions(dimensions);
    return {};
  }

  render() {
    return <Layout />;
  }
}

export default SequencerSection;
