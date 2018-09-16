import * as React from 'react';
import { observer } from 'mobx-react';
import { Circle } from 'react-konva';
import theme from 'styles/theme';
import { makeHandler } from 'utils/konva';
import { injector, hot } from 'utils/injector';

import { Graph, Port } from 'core/models/graph';
import { IO_RADIUS } from '../../helpers/layout';

import { get, PortInteractions } from 'features/GraphEditor/core';

export enum HoverState {
  HOVER = 'HOVER',
  NONE = 'NONE',
}

export interface Props {
  graph: Graph;
  port: Port;
}
export interface InjectedProps {
  attemptToConnect: PortInteractions['attemptToConnect'];
  beginDragFromClick: PortInteractions['beginDragFromClick'];
  getHoverState: PortInteractions['getHoverState'];
  handleDrag: PortInteractions['handleDrag'];
  isDragging: boolean;
}
export interface State {
  hover: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const { graph, port } = props;
  const portInteractions = get(props.graph, PortInteractions);
  return {
    getHoverState: portInteractions.getHoverState,
    attemptToConnect: portInteractions.attemptToConnect,
    beginDragFromClick: portInteractions.beginDragFromClick,
    handleDrag: portInteractions.handleDrag,
    isDragging: portInteractions.isDragging,
  };
});

@observer
export class _Port extends React.Component<Props & InjectedProps, {}> {
  state = {
    hover: HoverState.NONE,
  };

  handleMouseEnter = () => {
    const hover = this.props.getHoverState(this.props.port);
    this.setState({ hover });
  };

  handleMouseLeave = () => {
    const hover = this.props.getHoverState(this.props.port);
    this.setState({ hover });
  };

  handleMouseDown = (event: MouseEvent) => {};

  handleClick = (event: MouseEvent) => {
    const { port, isDragging } = this.props;
    if (!isDragging) {
      this.props.beginDragFromClick(event, port);
    } else {
      this.props.attemptToConnect(port);
    }
  };

  render() {
    const { port } = this.props;
    const { hover } = this.state;
    const isHovered = hover !== HoverState.NONE;

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
