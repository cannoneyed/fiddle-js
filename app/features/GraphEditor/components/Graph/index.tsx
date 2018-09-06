import * as React from 'react';
import { observer } from 'mobx-react';
import { Group } from 'react-konva';

import { Dimensions } from 'core/interfaces';
import { Graph as GraphModel } from 'core/models/graph';

import ConnectionComponent from 'features/GraphEditor/components/Connection';
import NodeComponent from 'features/GraphEditor/components/Node';

export interface Props {
  graph: GraphModel;
  dimensions: Dimensions;
}

@observer
export class Graph extends React.Component<Props, {}> {
  render() {
    const { dimensions, graph } = this.props;

    return (
      <Group {...dimensions}>
        {graph.outputs.map(output => {
          return <NodeComponent node={output} key={output.id} />;
        })}
        {graph.nodes.map(node => {
          return <NodeComponent node={node} key={node.id} />;
        })}
        {graph.connections.map((connection, index) => {
          const { from, to } = connection;
          return <ConnectionComponent key={index} from={from} to={to} />;
        })}
      </Group>
    );
  }
}

export default Graph;
