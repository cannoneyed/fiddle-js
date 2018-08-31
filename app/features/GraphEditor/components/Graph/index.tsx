import * as React from 'react';
import { observer } from 'mobx-react';
import { Circle, Group, Line, Rect, Text } from 'react-konva';
import { makeHandler, makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Graph as GraphModel, Node, OutputNode } from 'core/models/graph';

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
  handleMouseDown = (node: Node) => (event: MouseEvent) => {
    const { x: startX, y: startY } = node.position;
    const { pageX: startPageX, pageY: startPageY } = event;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.pageX - startPageX;
      const deltaY = event.pageY - startPageY;
      const position = { x: startX + deltaX, y: startY + deltaY };
      node.position.set(position);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  renderOutput(output: OutputNode, index: number) {
    const position = {
      ...output.position,
      ...dimensions,
    };
    return (
      <Group
        {...position}
        {...dimensions}
        key={index}
        onMouseDown={makeHandler(this.handleMouseDown(output))}
      >
        <Rect {...dimensions} fill="gray" key={index} />
        <Circle x={10} y={dimensions.height / 2} radius={5} fill={'white'} />
        <Text
          x={20}
          y={dimensions.height / 2 - 6}
          fontSize={12}
          fontFamily="Menlo"
          fill="white"
          text={`output ${index + 1}`}
        />
      </Group>
    );
  }

  renderNode(node: Node, index: number) {
    const position = {
      ...node.position,
      ...dimensions,
    };

    const text = 'envelope';

    return (
      <Group
        {...position}
        {...dimensions}
        key={index}
        onMouseDown={makeHandler(this.handleMouseDown(node))}
      >
        <Rect {...dimensions} fill="gray" key={index} />
        <Circle x={10} y={dimensions.height / 2} radius={5} fill={'white'} />
        <Text
          x={20}
          y={dimensions.height / 2 - 6}
          fontSize={12}
          fontFamily="Menlo"
          fill="white"
          text={text}
        />
      </Group>
    );
  }

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
        {graph.outputs.map((output, index) => {
          return this.renderOutput(output, index);
        })}
        {graph.nodes.map((node, index) => {
          return this.renderNode(node, index);
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
