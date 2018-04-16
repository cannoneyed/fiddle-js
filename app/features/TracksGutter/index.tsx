import * as React from 'react';
import { observer } from 'mobx-react';
import { inject } from 'utils/inject';

import { TrackHeader } from 'features/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerLayout } from 'core/stores/sequencer/layout';

const styles = require('./styles.less');

interface ComponentProps {
  sequencerLayout: SequencerLayout;
  trackStore: TrackStore;
}

@observer
class _TracksGutter extends React.Component<ComponentProps, {}> {
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

export const TracksGutter = inject(_TracksGutter, 'sequencerLayout', 'trackStore');
