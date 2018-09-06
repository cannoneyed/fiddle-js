import * as React from 'react';
import { observer } from 'mobx-react';
import { Wedge, Group, Rect, Text } from 'react-konva';
import { makeHandler } from 'utils/konva';
import theme from 'styles/theme';
import { range } from 'lodash';

import { Node as NodeModel } from 'core/models/graph';

export interface Props {
  node: NodeModel;
}

const dimensions = {
  width: 100,
  height: 25,
};

const IO_RADIUS = 5;

@observer
export class NodeComponent extends React.Component<Props, {}> {
  handleMouseDown = (node: NodeModel) => (event: MouseEvent) => {
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

  renderInputs() {
    const { nInputs } = this.props.node;
    return range(nInputs).map(i => {
      return (
        <Wedge
          key={`input-${i}`}
          x={10 * (i + 1)}
          y={dimensions.height}
          radius={IO_RADIUS}
          angle={180}
          rotation={180}
          fill={theme.colors.white.toRgbString()}
        />
      );
    });
  }

  renderOutputs() {
    const { nOutputs } = this.props.node;
    return range(nOutputs).map(i => {
      return (
        <Wedge
          key={`output-${i}`}
          x={10}
          y={0}
          radius={IO_RADIUS}
          angle={180}
          fill={theme.colors.white.toRgbString()}
        />
      );
    });
  }

  render() {
    const { node } = this.props;
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
          x={20}
          y={dimensions.height / 2 - 6}
          fontSize={12}
          fontFamily="Menlo"
          fill={theme.colors.white.toRgbString()}
          text={node.label}
        />
      </Group>
    );
  }
}

export default NodeComponent;
