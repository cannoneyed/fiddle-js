import * as React from 'react';
import { observer } from 'mobx-react';
import { Wedge, Group, Rect, Text } from 'react-konva';
import { makeHandler } from 'utils/konva';
import theme from 'styles/theme';
import { range } from 'lodash';
import { dimensions, getInputPosition, getOutputPosition, IO_RADIUS } from '../../helpers/layout';

import { Node as NodeModel } from 'core/models/graph';

export interface Props {
  node: NodeModel;
}

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
      const inputPosition = getInputPosition(i);
      return (
        <Wedge
          {...inputPosition}
          key={`input-${i}`}
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
      const outputPosition = getOutputPosition(i);
      return (
        <Wedge
          {...outputPosition}
          key={`output-${i}`}
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
