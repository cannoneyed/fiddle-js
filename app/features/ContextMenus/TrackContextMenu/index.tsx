import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Menu, MenuItem } from '@blueprintjs/core';

import { TimelineVector } from 'core/primitives/timeline-vector';
import { TrackStore } from 'core/state/stores/tracks';
import { ClipStore } from 'core/state/stores/clips';
import { SequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  trackId: string;
  offsetX: number;
}
interface InjectedProps {
  createClip: () => void;
  deleteTrack: () => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const { offsetX, trackId } = props;
  const clipStore = Container.get(ClipStore);
  const trackStore = Container.get(TrackStore);
  const sequencerPositionService = Container.get(SequencerPositionService);

  const position = sequencerPositionService.getTimelineVectorFromOffsetX(offsetX);
  const length = new TimelineVector(2);
  return {
    createClip: () => clipStore.create({ trackId, length, position }),
    deleteTrack: () => trackStore.deleteTrack(trackId),
  };
});

@observer
export class TrackContextMenu extends React.Component<Props & InjectedProps, {}> {
  render() {
    return (
      <Menu>
        <MenuItem onClick={() => this.props.createClip()} icon="insert" text="New Clip" />
        <MenuItem onClick={() => this.props.deleteTrack()} icon="cross" text="Delete Track" />
      </Menu>
    );
  }
}

export default inject(TrackContextMenu);
