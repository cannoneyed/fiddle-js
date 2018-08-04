import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { ContextMenu } from '@blueprintjs/core';

import TrackContextMenu from 'features/ContextMenus/TrackContextMenu';
import Clip from 'features/SequencerSection/Clip';

import { Dimensions } from 'core/interfaces';
import { Clip as ClipModel } from 'core/models/clip';
import { Track as TrackModel } from 'core/models/track';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';

import { ClipVisibilityHelper } from './helpers';

interface Props {
  offsetX: number;
  track: TrackModel;
  visibleWidth: number;
}
interface InjectedProps {
  dimensions: Dimensions;
  handleTrackClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
interface State {
  isContextMenuOpen: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const { track } = props;
  const tracksLayout = Container.get(TracksLayout);
  const trackMouseInteraction = Container.get(TracksMouseInteraction);

  const dimensions = {
    height: tracksLayout.trackHeight,
    width: tracksLayout.trackWidth,
  };

  return {
    dimensions,
    handleTrackClick: (e: React.MouseEvent<HTMLDivElement>) =>
      trackMouseInteraction.handleTrackClick(track, e),
  };
});

@observer
export class Track extends React.Component<Props & InjectedProps, State> {
  clipVisibilityHelper = new ClipVisibilityHelper();

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

  getVisibleClips(clips: ClipModel[]) {
    const { offsetX, visibleWidth } = this.props;
    const left = offsetX;
    const right = left + visibleWidth;
    return this.clipVisibilityHelper.computeVisibility(clips, left, right);
  }

  render() {
    const { track, dimensions } = this.props;

    const trackStyle = {
      ...dimensions,
    };

    const visibleClips = this.getVisibleClips(track.clips);
    const visibleDraggedClips = this.getVisibleClips(track.draggedClips);
    return (
      <TrackContainer
        style={trackStyle}
        onMouseDown={this.props.handleTrackClick}
        onContextMenu={this.showContextMenu}
      >
        {visibleClips.map((clip, index) => <Clip clip={clip} key={index} />)}
        {visibleDraggedClips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </TrackContainer>
    );
  }
}

export default inject(Track);

const TrackContainer = styled.div`
  border-bottom: solid 1px ${theme.colors.mediumGray.toRgbString()};
  width: 100%;
`;
