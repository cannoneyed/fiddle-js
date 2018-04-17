import * as React from 'react';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';

import Minimap from 'features/Minimap';
import Timeline from 'features/Timeline';
import TimelineGutter from 'features/TimelineGutter';
import Toolbar from 'features/Toolbar';
import TracksGutter from 'features/TracksGutter';
import TracksArea from 'features/TracksArea';

import { SequencerLayout } from 'core/stores/sequencer/layout';

const styles = require('./styles.less');

interface ComponentProps {
  sequencerLayout: SequencerLayout;
}

@observer
export class SequencerPage extends React.Component<ComponentProps, {}> {
  disposeObserver: IReactionDisposer;
  disposeHandlers: trackScrollHandlers.Unregister;

  componentDidMount() {
    this.disposeHandlers = trackScrollHandlers.register();
    this.disposeObserver = observeTracksScroll();
  }

  componentWillUnmount() {
    this.disposeHandlers();
    this.disposeObserver();
  }

  render() {
    const { sequencerLayout } = this.props;
    const { minimapHeight, timelineHeight, toolbarHeight, tracksAreaHeight } = sequencerLayout;

    const toolbarWrapperStyle = {
      height: toolbarHeight,
    };

    const timelineWrapperStyle = {
      height: timelineHeight,
    };

    const tracksAreaWrapperStyle = {
      height: tracksAreaHeight,
    };

    const minimapWrapperStyle = {
      height: minimapHeight,
    };

    return (
      <div className={styles.pageWrapper} id="sequencerPage">
        <div className={styles.toolbarWrapper} style={toolbarWrapperStyle}>
          <Toolbar />
        </div>
        <div className={styles.minimapWrapper} style={minimapWrapperStyle}>
          <Minimap />
        </div>
        <div className={styles.timelineWrapper} style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </div>
        <div className={styles.tracksAreaWrapper} style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksArea />
        </div>
      </div>
    );
  }
}

export default connect(SequencerPage, 'sequencerLayout');
