import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Group, Rect } from 'react-konva';
import { makeHandler } from 'utils/konva';

import { Coordinates, Dimensions } from 'core/interfaces';

import { TrackVisibilityHelper } from './helpers';

import DragToMarkers from 'features/Sequencer/components/DragToMarkers';
import Track from 'features/Sequencer/components/Track';

import { getTracksStore } from 'core/state/tree';
import { Track as TrackModel } from 'core/state/tree/models/track';

import {
  get,
  SequencerScrollInteraction,
  TracksLayout,
  TracksInteraction,
} from 'features/Sequencer/core';

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
  const tracksStore = getTracksStore();

  const getScroll = () => ({
    x: tracksLayout.tracksScrolledX,
    y: tracksLayout.tracksScrolledY,
  });

  return {
    getScroll,
    handleScroll: sequencerScrollInteraction.handleScroll,
    handleStageClick: tracksInteraction.handleStageClick,
    trackHeight: tracksLayout.trackHeight,
    tracks: tracksStore.tracks,
  };
});

@observer
export class TracksStage extends React.Component<Props & InjectedProps, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  private trackVisibilityHelper = new TrackVisibilityHelper();

  handleClick = makeHandler<MouseEvent>(event => {
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

    return { tracks: tracks.slice(topIndex, bottomIndex), topIndex };
  };

  render() {
    const { dimensions, getScroll, position, trackHeight } = this.props;
    const { tracks: visibleTracks, topIndex } = this.getVisibleTracks();

    const { x: scrollX, y: scrollY } = getScroll();

    // Make sure that the invisible Rect handles clicks, since all events bubble to
    // the Stage
    return (
      <Group {...position}>
        <Rect {...dimensions} onClick={this.handleClick} />
        <Group y={-scrollY} x={-scrollX}>
          {visibleTracks.map((track, index) => {
            const trackIndex = index + topIndex;
            const y = trackIndex * trackHeight;
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

export default inject(hot(module)(TracksStage));
