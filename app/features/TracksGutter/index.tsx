import * as React from 'react';
import { connect } from 'utils/connect';

import TrackHeader from 'features/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerLayout } from 'core/stores/sequencer/layout';

const styles = require('./styles.less');

interface Props {
  sequencerLayout: SequencerLayout;
  trackStore: TrackStore;
}

export class TracksGutter extends React.Component<Props, {}> {
  render() {
    const { trackStore, sequencerLayout } = this.props;
    const { trackList } = trackStore;
    const { gutterWidth } = sequencerLayout;

    const tracksGutterStyle = {
      minWidth: gutterWidth,
    };

    return (
      <div className={styles.tracksGutterContainer} style={tracksGutterStyle} id="tracksGutter">
        {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </div>
    );
  }
}

export default connect(TracksGutter, 'sequencerLayout', 'trackStore');
