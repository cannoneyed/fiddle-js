import * as React from 'react';
import { connect } from 'utils/connect';
import { observer } from 'mobx-react';

import { Track } from 'core/models/track';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  index: number;
  track: Track;
  tracksSectionLayout: TracksSectionLayout;
}

@observer
export class TrackHeader extends React.Component<Props, {}> {
  render() {
    const { index, track, tracksSectionLayout } = this.props;
    const { trackHeight } = tracksSectionLayout.tracks;

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

export default connect(TrackHeader, 'tracksSectionLayout');
