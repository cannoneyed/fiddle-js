import * as React from 'react';
import Konva from 'konva';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Group, Rect } from 'react-konva';
import { makeHandler } from 'utils/konva';

import { Track as TrackModel } from 'core/models/track';
import { Coordinates, Dimensions } from 'core/interfaces';

import { TrackVisibilityHelper } from './helpers';

import DragToMarkers from 'features/SequencerSection/components/DragToMarkers';
import Track from 'features/SequencerSection/components/Track';

import {
  get,
  SequencerScrollInteraction,
  TracksLayout,
  TracksInteraction,
} from 'features/SequencerSection/core';
import { TrackStore } from 'core';

interface Props {
  dimensions: Dimensions;
  position: Coordinates;
}

interface InjectedProps {
  getScroll: () => Coordinates;
  handleScroll: (deltaX: number, deltaY: number) => void;
  handleStageClick: (event: MouseEvent) => void;
  trackHeight: number;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(() => {
  const sequencerScrollInteraction = get(SequencerScrollInteraction);
  const tracksInteraction = get(TracksInteraction);
  const tracksLayout = get(TracksLayout);
  const trackStore = get(TrackStore);

  const getScroll = () => ({
    x: tracksLayout.tracksScrolledX,
    y: tracksLayout.tracksScrolledY,
  });

  return {
    getScroll,
    handleScroll: sequencerScrollInteraction.handleScroll,
    handleStageClick: tracksInteraction.handleStageClick,
    trackHeight: tracksLayout.trackHeight,
    tracks: trackStore.trackList,
  };
});

@observer
export class TracksStage extends React.Component<Props & InjectedProps, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  private trackVisibilityHelper = new TrackVisibilityHelper();

  handleClick = makeHandler<MouseEvent, Konva.Rect>(event => {
    return this.props.handleStageClick(event);
  });

  getVisibleTracks = () => {
    const { dimensions, tracks, trackHeight } = this.props;
    const { y: scrollY } = this.props.getScroll();
    const top = scrollY;
    const bottom = scrollY + dimensions.height;

    this.trackVisibilityHelper.trackHeight = trackHeight;
    this.trackVisibilityHelper.computeVisibility(tracks, top, bottom);
    const { topIndex, bottomIndex } = this.trackVisibilityHelper.getIndices();

    return tracks.slice(topIndex, bottomIndex);
  };

  render() {
    const { dimensions, getScroll, position, trackHeight } = this.props;
    const visibleTracks = this.getVisibleTracks();

    const { x: scrollX, y: scrollY } = getScroll();

    // Make sure that the invisible Rect handles clicks, since all events bubble to
    // the Stage
    return (
      <Group {...position}>
        <Rect {...dimensions} onClick={this.handleClick} />
        <Group y={-scrollY} x={-scrollX}>
          {visibleTracks.map(track => {
            const y = track.index * trackHeight;
            return (
              <Group key={track.id} y={y}>
                <Track
                  offsetX={scrollX}
                  height={trackHeight}
                  track={track}
                  visibleWidth={dimensions.width}
                />
              </Group>
            );
          })}
          <DragToMarkers />
        </Group>
      </Group>
    );
  }
}

export default inject(TracksStage);
