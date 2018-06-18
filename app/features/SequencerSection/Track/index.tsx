import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { ContextMenu } from '@blueprintjs/core';

import TrackContextMenu from 'features/ContextMenus/TrackContextMenu';
import Clip from 'features/SequencerSection/Clip';

import { Track as TrackModel } from 'core/models/track';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';

interface Props {
  track: TrackModel;
  index: number;
}
interface InjectedProps {
  handleTrackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  height: number;
  width: number;
}
interface State {
  isContextMenuOpen: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const { track } = props;
  const tracksLayout = Container.get(TracksLayout);
  const trackMouseInteraction = Container.get(TracksMouseInteraction);

  return {
    handleTrackClick: (e: React.MouseEvent<HTMLDivElement>) =>
      trackMouseInteraction.handleTrackClick(track, e),
    height: tracksLayout.trackHeight,
    width: tracksLayout.trackWidth,
  };
});

@observer
export class Track extends React.Component<Props & InjectedProps, State> {
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
    const { track, width, height } = this.props;

    const trackStyle = {
      height: height,
      width: width,
    };

    return (
      <TrackContainer
        style={trackStyle}
        onMouseDown={this.props.handleTrackClick}
        onContextMenu={this.showContextMenu}
      >
        {track.clips.map((clip, index) => <Clip clip={clip} key={index} />)}
        {track.draggedClips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </TrackContainer>
    );
  }
}

export default inject(Track);

const TrackContainer = styled.div`
  border-bottom: solid 1px ${theme.colors.mediumGray.toRgbString()};
  width: 100%;
`;
