import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Draggable, Unregister } from 'core/interactions/handlers/draggable';

import { TracksLayout } from 'features/SequencerSection/core/tracks';
import { get } from 'features/SequencerSection/core';

import { MinimapContainer, MinimapThumb } from './styled-components';

interface Props {}
interface InjectedProps {
  tracksScrollPercentX: number;
  tracksViewPercentX: number;
  setTracksScroll: (x: number) => void;
}
interface State {
  dragging: boolean;
  mouseover: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = get(TracksLayout);

  return {
    tracksScrollPercentX: tracksLayout.scrollPercentX,
    tracksViewPercentX: tracksLayout.tracksViewPercentX,
    setTracksScroll: (x: number) => tracksLayout.setTracksScroll({ x }),
  };
});

@observer
export class Minimap extends React.Component<Props & InjectedProps, State> {
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
    const { setTracksScroll, tracksScrollPercentX } = this.props;

    const nextScrollPercentX = tracksScrollPercentX + deltaPercentX;
    setTracksScroll(nextScrollPercentX);
  };

  render() {
    const { tracksScrollPercentX, tracksViewPercentX } = this.props;

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

export default inject(Minimap);
