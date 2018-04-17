import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import * as minimapScrollHandlers from 'core/interactions/minimap/scroll/handlers';
import * as minimapDragHandlers from 'core/interactions/minimap/drag/handlers';

import { SequencerView } from 'core/stores/sequencer/view';

import { MinimapContainer, MinimapThumb } from './styled-components';

interface Props {
  sequencerView: SequencerView;
}

@observer
export class Minimap extends React.Component<Props, {}> {
  unregisterScrollHandlers: minimapScrollHandlers.Unregister;
  unregisterDragHandlers: minimapDragHandlers.Unregister;

  componentDidMount() {
    this.unregisterScrollHandlers = minimapScrollHandlers.register();
    this.unregisterDragHandlers = minimapDragHandlers.register();
  }

  componentWillUnmount() {
    this.unregisterScrollHandlers();
    this.unregisterDragHandlers();
  }

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
      <MinimapContainer id="minimap">
        <MinimapThumb id="minimapScroll" style={thumbStyle} />
      </MinimapContainer>
    );
  }
}

export default connect(Minimap, 'sequencerView');
