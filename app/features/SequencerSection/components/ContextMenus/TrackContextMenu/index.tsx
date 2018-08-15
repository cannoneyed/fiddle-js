import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Menu, MenuItem } from '@blueprintjs/core';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { ClipActions, TrackActions } from 'core';
import { get, SequencerPositionService } from 'features/SequencerSection/core';

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
  const clipActions = get(ClipActions);
  const trackActions = get(TrackActions);
  const sequencerPositionService = get(SequencerPositionService);

  const position = sequencerPositionService.getTimelineVectorFromOffsetX(offsetX);
  const length = new TimelineVector(2);
  return {
    createClip: () => clipActions.createClip({ trackId, length, position }),
    deleteTrack: () => trackActions.deleteTrack(trackId),
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
