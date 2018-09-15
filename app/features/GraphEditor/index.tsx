import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Graph } from 'core/models/graph';

import Empty from 'features/GraphEditor/components/Empty';
import Layout from 'features/GraphEditor/components/Layout';

import { deriveStateFromProps } from 'features/GraphEditor/core';

export interface Props {
  dimensions: Dimensions;
  graph: Graph;
}

@observer
export class GraphEditor extends React.Component<Props, {}> {
  state = {};

  static getDerivedStateFromProps(props: Props) {
    const { graph } = props;
    if (graph) {
      deriveStateFromProps(graph, props);
    }
    return {};
  }

  render() {
    const { graph } = this.props;
    return graph !== null ? <Layout graph={graph} /> : <Empty />;
  }
}

export default GraphEditor;
