import * as React from 'react';

import { Draggable, Unregister } from 'core/state/interactions/handlers/draggable';

import {
  ScrollbarArea,
  ScrollBackButton,
  ScrollForwardButton,
  ScrollbarThumb,
  ScrollbarWrapper,
} from './styled-components';

interface Props {
  scrollPositionPercent: number;
  scrollViewPercent: number;
  onDrag: (deltaPercentX: number, deltaPercentY: number) => void;
  onThumbResize?: (delta: number) => void;
}

interface State {
  dragging: boolean;
  mouseover: boolean;
}

export class VerticalScrollbar extends React.Component<Props, State> {
  state = {
    dragging: false,
    mouseover: false,
  };

  draggable = new Draggable();
  unregisterDragHandlers: Unregister;

  containerRef: HTMLDivElement;
  thumbRef: HTMLDivElement;

  componentDidMount() {
    const { draggable } = this;
    draggable.onDrag(this.props.onDrag);
    draggable.onDragStart(() => this.setState({ dragging: true }));
    draggable.onDragEnd(() => this.setState({ dragging: false }));
    this.unregisterDragHandlers = this.draggable.register(this.containerRef!, this.thumbRef!);
  }

  componentWillUnmount() {
    this.unregisterDragHandlers();
  }

  render() {
    const { scrollPositionPercent, scrollViewPercent } = this.props;

    // We need to compute the relative top position of the scroll container since the scrollPercentY
    // is a normalized 0 to 1 value.
    const topPercent = scrollPositionPercent * (1 - scrollViewPercent);

    // Use inline style because it's much faster than using styled components
    const thumbStyle = {
      top: `${topPercent * 100}%`,
      height: `${scrollViewPercent * 100}%`,
    };

    const highlight = this.state.dragging || this.state.mouseover;

    return (
      <ScrollbarWrapper>
        <ScrollBackButton />
        <ScrollbarArea innerRef={ref => (this.containerRef = ref)}>
          <ScrollbarThumb
            innerRef={ref => (this.thumbRef = ref)}
            style={thumbStyle}
            highlight={highlight}
            onMouseOver={() => this.setState({ mouseover: true })}
            onMouseLeave={() => this.setState({ mouseover: false })}
          />
        </ScrollbarArea>
        <ScrollForwardButton />
      </ScrollbarWrapper>
    );
  }
}

export default VerticalScrollbar;
