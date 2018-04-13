import * as React from 'react';
import { inject, observer } from 'mobx-react';

import * as minimapScroll from 'interactions/minimap/scroll';
import * as minimapDrag from 'interactions/minimap/drag';

import { sequencerView, SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerView: SequencerView;
}

@inject(() => ({
  sequencerView,
}))
@observer
export class Minimap extends React.Component<ComponentProps, {}> {
  unregisterScrollHandlers: minimapScroll.UnregisterHandlers;
  unregisterDragHandlers: minimapDrag.UnregisterHandlers;

  get injected() {
    return this.props as InjectedProps;
  }

  componentDidMount() {
    this.unregisterScrollHandlers = minimapScroll.registerHandlers();
    this.unregisterDragHandlers = minimapDrag.registerHandlers();
  }

  componentWillUnmount() {
    this.unregisterScrollHandlers();
    this.unregisterDragHandlers();
  }

  render() {
    const { sequencerView } = this.injected;
    const { tracksScrollPercentX, tracksViewPercentX } = sequencerView.tracks;

    // We need to compute the relative left position of the minimap container's since the scrollPercentX
    // is a normalized 0 to 1 value.
    const leftPercent = tracksScrollPercentX * (1 - tracksViewPercentX);

    const minimapScrollContainerStyle = {
      left: `${leftPercent * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
    };

    return (
      <div className={styles.minimapContainer} id="minimap">
        <div
          className={styles.minimapScrollContainer}
          id="minimapScroll"
          style={minimapScrollContainerStyle}
        />
      </div>
    );
  }
}
