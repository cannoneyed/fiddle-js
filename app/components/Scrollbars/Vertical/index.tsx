import * as React from 'react';

import { Draggable, Unregister } from 'core/interactions/handlers/draggable';

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
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onThumbResize?: (delta: number) => void;
}

export class VerticalScrollbar extends React.Component<Props, {}> {
  draggable = new Draggable();
  unregisterDragHandlers: Unregister;

  containerRef: HTMLDivElement;
  thumbRef: HTMLDivElement;

  static defaultProps = {
    onDragStart: () => {},
    onDragEnd: () => {},
  };

  componentDidMount() {
    const { draggable } = this;
    const { onDrag, onDragStart, onDragEnd } = this.props;
    draggable.onDrag(onDrag);
    draggable.onDragStart(onDragStart!);
    draggable.onDragEnd(onDragEnd!);
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

    return (
      <ScrollbarWrapper>
        <ScrollBackButton />
        <ScrollbarArea innerRef={ref => (this.containerRef = ref)}>
          <ScrollbarThumb innerRef={ref => (this.thumbRef = ref)} style={thumbStyle} />
        </ScrollbarArea>
        <ScrollForwardButton />
      </ScrollbarWrapper>
    );
  }
}

export default VerticalScrollbar;
