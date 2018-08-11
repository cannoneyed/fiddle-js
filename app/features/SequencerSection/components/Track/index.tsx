import * as React from 'react';
import Konva from 'konva';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { ContextMenu } from '@blueprintjs/core';
import theme from 'styles/theme';
import { Group, Line, Rect } from 'react-konva';
import { makeHandler, makePoints } from 'utils/konva';

import TrackContextMenu from 'features/ContextMenus/TrackContextMenu';
import Clip from 'features/SequencerSection/components/Clip';

import { Dimensions } from 'core/interfaces';
import { Clip as ClipModel } from 'core/models/clip';
import { Track as TrackModel } from 'core/models/track';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { TracksMouseInteraction } from 'core/interactions/tracks/mouse';

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
  const { track } = props;
  const tracksLayout = Container.get(TracksLayout);
  const trackMouseInteraction = Container.get(TracksMouseInteraction);

  const dimensions = {
    height: tracksLayout.trackHeight,
    width: tracksLayout.trackWidth,
  };

  return {
    dimensions,
    handleTrackClick: (e: MouseEvent) => trackMouseInteraction.handleTrackClick(track, e),
  };
});

@observer
export class Track extends React.Component<Props & InjectedProps, State> {
  clipVisibilityHelper = new ClipVisibilityHelper();

  renderContextMenu = (offsetX: number) => {
    const { track } = this.props;

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />;
  };

  handleTrackClick = makeHandler<MouseEvent, Konva.Rect>(event => {
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
    const visibleDraggedClips = this.getVisibleClips(track.draggedClips);

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

export default inject(Track);
