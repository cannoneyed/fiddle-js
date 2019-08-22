import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { ContextMenu } from '@blueprintjs/core';
import theme from 'styles/theme';
import { Group, Line, Rect } from 'react-konva';
import { makeHandler, makePoints } from 'utils/konva';

import TrackContextMenu from 'features/Sequencer/components/ContextMenus/TrackContextMenu';
import Clip from 'features/Sequencer/components/Clip';

import { Dimensions } from 'core/interfaces';

import { Clip as ClipModel } from 'core/state/tree/models/clip';
import { Track as TrackModel } from 'core/state/tree/models/track';

import { get, TracksLayout } from 'features/Sequencer/core';

import { ClipVisibilityHelper } from './helpers';

interface Props {
  offsetX: number;
  track: TrackModel;
  height: number;
  visibleWidth: number;
}
interface InjectedProps {
  dimensions: Dimensions;
  handleTrackClick: (e: MouseEvent) => void;
}
interface State {
  isContextMenuOpen: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  // const { track } = props;
  const tracksLayout = get(TracksLayout);
  // const trackInteraction = get(TracksInteraction);

  const dimensions = {
    height: tracksLayout.trackHeight,
    width: tracksLayout.trackWidth,
  };

  return {
    dimensions,
    // handleTrackClick: (e: MouseEvent) => trackInteraction.handleTrackClick(track, e),
    handleTrackClick: (e: MouseEvent) => {},
  };
});

@observer
export class Track extends React.Component<Props & InjectedProps, State> {
  clipVisibilityHelper = new ClipVisibilityHelper();

  renderContextMenu = (offsetX: number) => {
    const { track } = this.props;

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />;
  };

  handleTrackClick = makeHandler<MouseEvent>(event => {
    if (event.ctrlKey) {
      return this.showContextMenu(event);
    }
    return this.props.handleTrackClick(event);
  });

  showContextMenu = (e: MouseEvent) => {
    const props = { left: e.clientX, top: e.clientY };
    const callback = () => this.setState({ isContextMenuOpen: false });
    ContextMenu.show(this.renderContextMenu(e.offsetX), props, callback);
    this.setState({ isContextMenuOpen: true });
  };

  getVisibleClips(clips: ClipModel[]) {
    const { offsetX, visibleWidth } = this.props;
    const left = offsetX;
    const right = left + visibleWidth;
    return this.clipVisibilityHelper.computeVisibility(clips, left, right);
  }

  render() {
    const { track, offsetX, height, visibleWidth } = this.props;

    const visibleClips = this.getVisibleClips(track.clips);
    // const visibleDraggedClips = this.getVisibleClips(track.draggedClips);
    const visibleDraggedClips: ClipModel[] = [];

    const start = { x: offsetX, y: height };
    const end = { x: offsetX + visibleWidth, y: height };
    const points = makePoints([start, end]);

    return (
      <Group>
        <Rect height={height} width={visibleWidth} onMouseDown={this.handleTrackClick} />
        <Line points={points} stroke={theme.colors.mediumGray.toRgbString()} strokeWidth={1} />
        {visibleClips.map(clip => {
          return <Clip key={clip.id} clip={clip} height={height} />;
        })}
        {visibleDraggedClips.map(clip => {
          return <Clip key={clip.id} clip={clip} height={height} isDragging={true} />;
        })}
      </Group>
    );
  }
}

export default inject(hot(module)(Track));
