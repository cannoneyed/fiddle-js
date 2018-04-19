import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import { Track } from 'core/models/track';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

const styles = require('./styles.less');

interface Props {
  index: number;
  track: Track;
}

@observer
export default class TrackHeader extends React.Component<Props, {}> {
  tracksSectionLayout = Container.get(TracksSectionLayout);

  render() {
    const { index, track } = this.props;
    const { trackHeight } = this.tracksSectionLayout.tracks;

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
