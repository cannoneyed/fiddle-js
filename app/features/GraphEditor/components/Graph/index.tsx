import * as React from 'react';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';
import { hot, injector } from 'utils/injector';
import { makeHandler } from 'utils/konva';

import { get, SelectInteraction } from 'features/GraphEditor/core';

import { Dimensions } from 'core/interfaces';
import { Graph as GraphModel } from 'core/models/graph';

import ConnectionComponent from 'features/GraphEditor/components/Connection';
import NodeComponent from 'features/GraphEditor/components/Node';
import DraggingConnection from 'features/GraphEditor/components/DraggingConnection';

export interface Props {
  graph: GraphModel;
  dimensions: Dimensions;
}
export interface InjectedProps {
  deselectAllNodes: SelectInteraction['deselectAllNodes'];
}

const inject = injector<Props, InjectedProps>(props => {
  const selectInteractions = get(props.graph, SelectInteraction);
  return {
    deselectAllNodes: selectInteractions.deselectAllNodes,
  };
});

@observer
export class Graph extends React.Component<Props & InjectedProps, {}> {
  handleClick = () => {
    this.props.deselectAllNodes();
  };

  render() {
    const { dimensions, graph } = this.props;

    return (
      <Group {...dimensions}>
        <Rect {...dimensions} onClick={makeHandler(this.handleClick)} />
        <DraggingConnection graph={graph} />
        {graph.connections.map((connection, index) => {
          const { from, to } = connection;
          return <ConnectionComponent graph={graph} key={index} from={from} to={to} />;
        })}
        {graph.outputs.map(output => {
          return <NodeComponent graph={graph} node={output} key={output.id} />;
        })}
        {graph.nodes.map(node => {
          return <NodeComponent graph={graph} node={node} key={node.id} />;
        })}
      </Group>
    );
  }
}

export default inject(hot(module)(Graph));
