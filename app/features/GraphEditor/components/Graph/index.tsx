import * as React from 'react';
import { observer } from 'mobx-react';
import { Group, Line } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Graph as GraphModel, Node } from 'core/models/graph';

import NodeComponent from 'features/GraphEditor/components/Node';

export interface Props {
  graph: GraphModel;
  dimensions: Dimensions;
}

const dimensions = {
  width: 100,
  height: 20,
};

@observer
export class Graph extends React.Component<Props, {}> {
  renderConnection(from: Node, to: Node, index: number) {
    const offset = ({ x, y }: { x: number; y: number }) => {
      const o = dimensions.height / 2;
      return { x: x + o, y: y + o };
    };

    const startPosition = offset(from.position);
    const endPosition = offset(to.position);
    const points = makePoints([startPosition, endPosition]);

    return <Line key={index} points={points} strokeWidth={2} stroke="white" />;
  }

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
          const [from, to] = connection;
          return this.renderConnection(from, to, index);
        })}
      </Group>
    );
  }
}

export default Graph;
