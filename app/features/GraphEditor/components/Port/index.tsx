import * as React from 'react';
import { observer } from 'mobx-react';
import { Circle } from 'react-konva';
import theme from 'styles/theme';
import { makeHandler } from 'utils/konva';
import { injector, hot } from 'utils/injector';

import { Graph, Port } from 'core/models/graph';
import { IO_RADIUS } from '../../helpers/layout';

import { get, PortInteractions } from 'features/GraphEditor/core';

export interface Props {
  graph: Graph;
  port: Port;
}
export interface InjectedProps {
  beginDragFromClick: PortInteractions['beginDragFromClick'];
  handleDrag: PortInteractions['handleDrag'];
}
export interface State {
  isHovered: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const portInteraction = get(props.graph, PortInteractions);
  return {
    beginDragFromClick: portInteraction.beginDragFromClick,
    handleDrag: portInteraction.handleDrag,
  };
});

@observer
export class _Port extends React.Component<Props & InjectedProps, {}> {
  state = {
    isHovered: false,
  };

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  handleMouseDown = (event: MouseEvent) => {};

  handleClick = (event: MouseEvent) => {
    const { port } = this.props;
    this.props.beginDragFromClick(event, port);
  };

  render() {
    const { port } = this.props;
    const { isHovered } = this.state;

    const fill = isHovered ? 'red' : theme.colors.white.toRgbString();
    const radius = isHovered ? IO_RADIUS + 2 : IO_RADIUS;

    return (
      <Circle
        onClick={makeHandler(this.handleClick)}
        onMouseDown={makeHandler(this.handleMouseDown)}
        onMouseEnter={makeHandler(this.handleMouseEnter)}
        onMouseLeave={makeHandler(this.handleMouseLeave)}
        {...port.position}
        radius={radius}
        strokeWidth={2}
        stroke={theme.colors.black.toRgbString()}
        fill={fill}
      />
    );
  }
}

export default inject(hot(module)(_Port));
