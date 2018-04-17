import * as React from 'react';
import { connect } from 'utils/connect';
import { observer } from 'mobx-react';

import { Track } from 'core/models/track';
import { SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

interface Props {
  index: number;
  track: Track;
  sequencerView: SequencerView;
}

@observer
export class TrackHeader extends React.Component<Props, {}> {
  render() {
    const { index, track, sequencerView } = this.props;
    const { trackHeight } = sequencerView.tracks;

    const headerStyle = {
      height: trackHeight,
    };

    return (
      <div className={styles.trackHeader} style={headerStyle}>
        {index} : {track.id}
      </div>
    );
  }
}

export default connect(TrackHeader, 'sequencerView');
