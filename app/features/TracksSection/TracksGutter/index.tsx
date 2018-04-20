import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import TrackHeader from 'features/TracksSection/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

const styles = require('./styles.less');

interface Props {}

@observer
export default class TracksGutter extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
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
