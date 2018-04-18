import * as React from 'react';
import { connect } from 'utils/connect';

import TrackHeader from 'features/TracksSection/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

const styles = require('./styles.less');

interface Props {
  sequencerPageLayout: SequencerPageLayout;
  trackStore: TrackStore;
}

export class TracksGutter extends React.Component<Props, {}> {
  render() {
    const { trackStore, sequencerPageLayout } = this.props;
    const { trackList } = trackStore;
    const { gutterWidth } = sequencerPageLayout;

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

export default connect(TracksGutter, 'sequencerPageLayout', 'trackStore');
