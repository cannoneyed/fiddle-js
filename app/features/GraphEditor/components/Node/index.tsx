import * as React from 'react';
import { observer } from 'mobx-react';
import { Group, Rect, Text } from 'react-konva';
import { makeHandler } from 'utils/konva';
import theme from 'styles/theme';
import { range } from 'lodash';
import { hot, injector } from 'utils/injector';

import { getInputPosition, getOutputPosition } from 'features/GraphEditor/helpers/layout';
import { get, GraphEditorLayout } from 'features/GraphEditor/core';

import { Coordinates } from 'core/interfaces';
import { Graph, Node as NodeModel } from 'core/models/graph';

import Port from 'features/GraphEditor/components/Port';

export interface Props {
  graph: Graph;
  node: NodeModel;
}
export interface InjectedProps {
  setNodePosition: (node: NodeModel, position: Coordinates) => void;
}

const FONT_SIZE = 12;
const TEXT_PADDING_LEFT = 20;

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.graph, GraphEditorLayout);
  return {
    setNodePosition: layout.setNodePosition,
  };
});

@observer
export class NodeComponent extends React.Component<Props & InjectedProps, {}> {
  handleMouseDown = (node: NodeModel) => (event: MouseEvent) => {
    const { x: startX, y: startY } = node.position;
    const { pageX: startPageX, pageY: startPageY } = event;

    const handleMouseMove = (event: MouseEvent) => {
      const deltaX = event.pageX - startPageX;
      const deltaY = event.pageY - startPageY;
      const position = { x: startX + deltaX, y: startY + deltaY };
      this.props.setNodePosition(node, position);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  renderInputs() {
    const { nInputs } = this.props.node;
    return range(nInputs).map(i => {
      const inputPosition = getInputPosition(this.props.node, i);
      return <Port position={inputPosition} key={`input-${i}`} />;
    });
  }

  renderOutputs() {
    const { nOutputs } = this.props.node;
    return range(nOutputs).map(i => {
      const outputPosition = getOutputPosition(i);
      return <Port position={outputPosition} key={`output-${i}`} />;
    });
  }

  render() {
    const { node } = this.props;
    const { dimensions } = node;

    const position = {
      ...node.position,
      ...dimensions,
    };

    return (
      <Group {...position} {...dimensions} onMouseDown={makeHandler(this.handleMouseDown(node))}>
        <Rect {...dimensions} fill="gray" />
        {this.renderInputs()}
        {this.renderOutputs()}
        <Text
          x={TEXT_PADDING_LEFT}
          y={dimensions.height / 2 - FONT_SIZE / 2}
          fontSize={FONT_SIZE}
          fontFamily="Menlo"
          fill={theme.colors.white.toRgbString()}
          text={node.label}
        />
      </Group>
    );
  }
}

export default inject(hot(module)(NodeComponent));
