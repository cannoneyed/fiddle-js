import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { Draggable, Unregister } from 'core/state/interactions/handlers/draggable';

import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

import { MinimapContainer, MinimapThumb } from './styled-components';

interface Props {}

interface ComponentState {
  dragging: boolean;
  mouseover: boolean;
}

@observer
export default class Minimap extends React.Component<Props, ComponentState> {
  tracksLayout = Container.get(TracksLayout);

  state = {
    dragging: false,
    mouseover: false,
  };

  draggable = new Draggable();
  unregisterDragHandlers: Unregister;

  minimapRef: HTMLDivElement;
  thumbRef: HTMLDivElement;

  componentDidMount() {
    const { draggable } = this;
    draggable.onDrag(this.handleThumbDrag);
    draggable.onDragStart(() => this.setState({ dragging: true }));
    draggable.onDragEnd(() => this.setState({ dragging: false }));
    this.unregisterDragHandlers = this.draggable.register(this.minimapRef!, this.thumbRef!);
  }

  componentWillUnmount() {
    this.unregisterDragHandlers();
  }

  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { tracksLayout } = this;
    const { tracksScrollPercentX } = tracksLayout;

    const nextScrollPercentX = tracksScrollPercentX + deltaPercentX;
    tracksLayout.setTracksScroll({ x: nextScrollPercentX });
  };

  render() {
    const { tracksLayout } = this;
    const { tracksScrollPercentX, tracksViewPercentX } = tracksLayout;

    // We need to compute the relative left position of the minimap container's since the scrollPercentX
    // is a normalized 0 to 1 value.
    const leftPercent = tracksScrollPercentX * (1 - tracksViewPercentX);

    // Use inline style because it's much faster than using styled components
    const thumbStyle = {
      left: `${leftPercent * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
    };

    const highlight = this.state.dragging || this.state.mouseover;

    return (
      <MinimapContainer id="minimap" innerRef={ref => (this.minimapRef = ref)}>
        <MinimapThumb
          innerRef={ref => (this.thumbRef = ref)}
          id="minimapScroll"
          style={thumbStyle}
          highlight={highlight}
          onMouseEnter={() => this.setState({ mouseover: true })}
          onMouseLeave={() => this.setState({ mouseover: false })}
        />
      </MinimapContainer>
    );
  }
}
