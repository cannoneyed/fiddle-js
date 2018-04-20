import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { ContextMenu } from '@blueprintjs/core';

import TrackContextMenu from 'features/TrackContextMenu';
import Clip from 'features/Clip';

import { Track as TrackModel } from 'core/models/track';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';
import { TrackMouseInteraction } from 'core/interactions/tracks/mouse';

const styles = require('./styles.less');

interface Props {
  track: TrackModel;
  index: number;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export default class Track extends React.Component<Props, State> {
  tracksSectionLayout = Container.get(TracksSectionLayout);
  trackMouseInteraction = Container.get(TrackMouseInteraction);

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { track } = this.props;
    this.trackMouseInteraction.handleTrackClick(track, event);
  };

  renderContextMenu = (offsetX: number) => {
    const { track } = this.props;

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />;
  };

  showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const props = { left: e.clientX, top: e.clientY };
    const callback = () => this.setState({ isContextMenuOpen: false });
    ContextMenu.show(this.renderContextMenu(e.nativeEvent.offsetX), props, callback);
    this.setState({ isContextMenuOpen: true });
  };

  render() {
    const { track } = this.props;
    const { trackHeight, trackWidth } = this.tracksSectionLayout.tracks;

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    };

    return (
      <div
        className={styles.trackContainer}
        style={trackStyle}
        onMouseDown={this.handleClick}
        onContextMenu={this.showContextMenu}
      >
        {track.clips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </div>
    );
  }
}
