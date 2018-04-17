import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import { Draggable, Unregister } from 'core/interactions/handlers/draggable';

import { SequencerView } from 'core/stores/sequencer/view';

import { MinimapContainer, MinimapThumb } from './styled-components';

interface Props {
  sequencerView: SequencerView;
}

@observer
export class Minimap extends React.Component<Props, {}> {
  draggable = new Draggable();
  unregisterDragHandlers: Unregister;

  minimapRef: HTMLDivElement;
  thumbRef: HTMLDivElement;

  componentDidMount() {
    const { draggable } = this;
    draggable.onDrag(this.handleThumbDrag);
    this.unregisterDragHandlers = this.draggable.register(this.minimapRef!, this.thumbRef!);
  }

  componentWillUnmount() {
    this.unregisterDragHandlers();
  }

  handleThumbDrag = (deltaPercentX: number, deltaPercentY: number) => {
    const { sequencerView } = this.props;
    const { tracksScrollPercentX } = sequencerView.tracks;

    const nextScrollPercentX = tracksScrollPercentX - deltaPercentX;
    sequencerView.tracks.setTracksScroll({ x: nextScrollPercentX });
  };

  render() {
    const { sequencerView } = this.props;
    const { tracksScrollPercentX, tracksViewPercentX } = sequencerView.tracks;

    // We need to compute the relative left position of the minimap container's since the scrollPercentX
    // is a normalized 0 to 1 value.
    const leftPercent = tracksScrollPercentX * (1 - tracksViewPercentX);

    // Use inline style because it's much faster than using styled components
    const thumbStyle = {
      left: `${leftPercent * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
    };

    return (
      <MinimapContainer id="minimap" innerRef={ref => (this.minimapRef = ref)}>
        <MinimapThumb
          innerRef={ref => (this.thumbRef = ref)}
          id="minimapScroll"
          style={thumbStyle}
        />
      </MinimapContainer>
    );
  }
}

export default connect(Minimap, 'sequencerView');
