import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { ContextMenu } from '@blueprintjs/core';

import TrackContextMenu from 'features/TracksSection/TrackContextMenu';
import Clip from 'features/Clip';

import { Track as TrackModel } from 'core/models/track';
import { TracksLayout } from 'core/layouts/sequencer/tracks';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';
import { ClipDragInteraction } from 'core/interactions/clip/drag';

interface Props {
  track: TrackModel;
  index: number;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export default class Track extends React.Component<Props, State> {
  clipDragInteraction = Container.get(ClipDragInteraction);
  tracksLayout = Container.get(TracksLayout);
  trackMouseInteraction = Container.get(TracksMouseInteraction);

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
    const { trackMouseInteraction } = this;
    const { track } = this.props;
    const { trackHeight, trackWidth } = this.tracksLayout;

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    };

    return (
      <TrackContainer
        style={trackStyle}
        onMouseDown={e => trackMouseInteraction.handleTrackClick(track, e)}
        onMouseOver={e => trackMouseInteraction.handleMouseEnter(track, e)}
        onMouseLeave={e => trackMouseInteraction.handleMouseLeave(track, e)}
        onContextMenu={this.showContextMenu}
      >
        {track.clips.map((clip, index) => <Clip clip={clip} key={index} />)}
        {track.draggedClips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </TrackContainer>
    );
  }
}

const TrackContainer = styled.div`
  border-bottom: solid 1px ${theme.colors.mediumGray.toRgbString()};
  width: 100%;
`;
