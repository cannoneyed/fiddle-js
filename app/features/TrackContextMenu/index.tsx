import * as React from 'react';
import { Container } from 'typedi';
import { inject, observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { trackStore, TrackStore } from 'core/stores/tracks';
import { ClipStore } from 'core/stores/clips';
import { sequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  trackId: string;
  offsetX: number;
}

interface InjectedProps extends Props {
  trackStore: TrackStore;
}

// Use the old state injection system because the blueprint context menu portal breaks app context
@inject(() => ({
  trackStore,
}))
@observer
export class TrackContextMenu extends React.Component<Props, {}> {
  clipStore = Container.get(ClipStore);

  get injected() {
    return this.props as InjectedProps;
  }

  deleteTrack = () => {
    const { trackId } = this.props;
    const { trackStore } = this.injected;
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

export default TrackContextMenu;
