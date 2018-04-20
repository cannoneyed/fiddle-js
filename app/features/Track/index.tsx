import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
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
  tracksSectionLayout: TracksSectionLayout;
  trackMouseInteraction: TrackMouseInteraction;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export class Track extends React.Component<Props, State> {
  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { track, trackMouseInteraction } = this.props;
    trackMouseInteraction.handleTrackClick(track, event);
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
    const { track, tracksSectionLayout } = this.props;
    const { trackHeight, trackWidth } = tracksSectionLayout.tracks;

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

export default connect(Track, 'tracksSectionLayout', 'trackMouseInteraction');
