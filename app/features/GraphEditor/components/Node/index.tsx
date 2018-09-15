import * as React from 'react';
import { observer } from 'mobx-react';
import { Group, Rect, Text } from 'react-konva';
import { makeHandler } from 'utils/konva';
import theme from 'styles/theme';
import { hot, injector } from 'utils/injector';

import { get, DragInteraction, SelectInteraction } from 'features/GraphEditor/core';

import { Graph, Node as NodeModel } from 'core/models/graph';

import Port from 'features/GraphEditor/components/Port';

const FONT_SIZE = 12;
const TEXT_PADDING_LEFT = 20;

export interface Props {
  graph: Graph;
  node: NodeModel;
}
export interface InjectedProps {
  endDrag: DragInteraction['endDrag'];
  isSelected: boolean;
  selectNode: SelectInteraction['selectNode'];
  handleNodeDrag: DragInteraction['handleNodeDrag'];
}

const inject = injector<Props, InjectedProps>(props => {
  const dragInteraction = get(props.graph, DragInteraction);
  const selectInteractions = get(props.graph, SelectInteraction);
  return {
    isSelected: selectInteractions.isNodeSelected(props.node),
    endDrag: dragInteraction.endDrag,
    handleNodeDrag: dragInteraction.handleNodeDrag,
    selectNode: selectInteractions.selectNode,
  };
});

@observer
export class NodeComponent extends React.Component<Props & InjectedProps, {}> {
  handleMouseDown = (node: NodeModel) => (event: MouseEvent) => {
    const { pageX: startPageX, pageY: startPageY } = event;

    const multiple = event.shiftKey;
    this.props.selectNode(node, multiple);

    const handleMouseMove = (event: MouseEvent) => {
      const deltaPosition = { x: event.pageX - startPageX, y: event.pageY - startPageY };
      this.props.handleNodeDrag(node, deltaPosition);
    };

    const handleMouseUp = () => {
      this.props.endDrag();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  renderInputs() {
    const { graph, node } = this.props;
    return node.inputPorts.map(port => {
      return <Port graph={graph} port={port} key={`input-${port.index}`} />;
    });
  }

  renderOutputs() {
    const { graph, node } = this.props;
    return node.outputPorts.map(port => {
      return <Port graph={graph} port={port} key={`output-${port.index}`} />;
    });
  }

  render() {
    const { node, isSelected } = this.props;
    const { dimensions } = node;

    const position = {
      ...node.position,
      ...dimensions,
    };

    const outline = isSelected ? theme.colors.white.toRgbString() : undefined;

    return (
      <Group {...position} {...dimensions} onMouseDown={makeHandler(this.handleMouseDown(node))}>
        <Rect {...dimensions} cornerRadius={4} fill="gray" strokeWidth={2} stroke={outline} />
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
