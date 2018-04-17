import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { Menu, MenuItem } from '@blueprintjs/core';

import { TrackStore } from 'core/stores/tracks';
import { ClipStore } from 'core/stores/clips';
import { sequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  trackId: string;
  offsetX: number;
  trackStore: TrackStore;
  clipStore: ClipStore;
}

@observer
export class TrackContextMenu extends React.Component<Props, {}> {
  deleteTrack = () => {
    const { trackId, trackStore } = this.props;
    trackStore.deleteTrack(trackId);
  };

  createClip = () => {
    const { clipStore, trackId, offsetX } = this.props;
    const position = sequencerPositionService.getTimelineVector(offsetX);

    clipStore.createClip({ trackId, position });
  };

  render() {
    return (
      <Menu>
        <MenuItem onClick={this.createClip} icon="insert" text="New Clip" />
        <MenuItem onClick={this.deleteTrack} icon="cross" text="Delete Track" />
      </Menu>
    );
  }
}

export default connect(TrackContextMenu, 'clipStore', 'trackStore');
