import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { TrackStore } from 'core/stores/tracks';
import { ClipStore } from 'core/stores/clips';
import { sequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  trackId: string;
  offsetX: number;
}

@observer
export default class TrackContextMenu extends React.Component<Props, {}> {
  clipStore = Container.get(ClipStore);
  trackStore = Container.get(TrackStore);

  deleteTrack = () => {
    const { trackId } = this.props;
    const { trackStore } = this;
    trackStore.deleteTrack(trackId);
  };

  createClip = () => {
    const { trackId, offsetX } = this.props;
    const { clipStore } = this;
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
