import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Stage, Layer, Group } from 'react-konva';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { Coordinates, Dimensions } from 'core/interfaces';

import { TrackVisibilityHelper } from './helpers';

import Track from 'features/SequencerSection/Track';

interface Props {
  dimensions: Dimensions;
}

interface InjectedProps {
  getScroll: () => Coordinates;
  handleScroll: (deltaX: number, deltaY: number) => void;
  trackHeight: number;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(() => {
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);
  const tracksLayout = Container.get(TracksLayout);
  const trackStore = Container.get(TrackStore);

  const getScroll = () => ({
    x: tracksLayout.tracksScrolledX,
    y: tracksLayout.tracksScrolledY,
  });

  return {
    getScroll,
    handleScroll: sequencerScrollInteraction.handleScroll,
    trackHeight: tracksLayout.trackHeight,
    tracks: trackStore.trackList,
  };
});

interface WrappedEvent {
  evt: WheelEvent;
}

@observer
export class TracksStage extends React.Component<Props & InjectedProps, {}> {
  private trackVisibilityHelper = new TrackVisibilityHelper();

  handleMouseWheel = (wrappedEvent: WrappedEvent) => {
    const { evt: event } = wrappedEvent;
    event.preventDefault();
    const { deltaX, deltaY } = event;
    this.props.handleScroll(deltaX, deltaY);
  };

  getVisibleTracks = () => {
    const { dimensions, tracks, trackHeight } = this.props;
    const { y: scrollY } = this.props.getScroll();
    const top = scrollY;
    const bottom = scrollY + dimensions.height;

    this.trackVisibilityHelper.trackHeight = trackHeight;
    this.trackVisibilityHelper.computeVisibility(tracks, top, bottom);
    const { topIndex, bottomIndex } = this.trackVisibilityHelper;

    return tracks.slice(topIndex, bottomIndex);
  };

  render() {
    const { dimensions, getScroll, trackHeight } = this.props;
    const visibleTracks = this.getVisibleTracks();

    const { x: scrollX, y: scrollY } = getScroll();

    return (
      <Stage width={dimensions.width} height={dimensions.height} onWheel={this.handleMouseWheel}>
        <Layer>
          <Group y={-scrollY}>
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
          </Group>
        </Layer>
      </Stage>
    );
  }
}

export default inject(TracksStage);
