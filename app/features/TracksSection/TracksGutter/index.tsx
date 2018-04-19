import * as React from 'react';
import { Container } from 'typedi';
import { connect } from 'utils/connect';

import TrackHeader from 'features/TracksSection/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

const styles = require('./styles.less');

interface Props {
  trackStore: TrackStore;
}

export class TracksGutter extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);

  render() {
    const { trackStore } = this.props;
    const { trackList } = trackStore;
    const { gutterWidth } = this.sequencerPageLayout;

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

export default connect(TracksGutter, 'trackStore');
