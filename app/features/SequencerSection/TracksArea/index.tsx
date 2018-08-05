import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Track from 'features/SequencerSection/Track';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { Coordinates, Dimensions } from 'core/interfaces';

import { TrackVisibilityHelper } from './helpers';
import DragToMarker from './DragToMarker';
import { TrackContainer, TracksAreaContainer, TracksContainer } from './styled-components';

interface Props {
  visibleDimensions: Dimensions;
}

interface InjectedProps {
  dimensions: Dimensions;
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
    dimensions: tracksLayout.tracksViewportDimensions,
    getScroll,
    handleScroll: sequencerScrollInteraction.handleScroll,
    trackHeight: tracksLayout.trackHeight,
    tracks: trackStore.trackList,
  };
});

@observer
export class TracksArea extends React.Component<Props & InjectedProps, {}> {
  private trackVisibilityHelper = new TrackVisibilityHelper();

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  getVisibleTracks = () => {
    const { visibleDimensions, tracks, trackHeight } = this.props;
    const { y: scrollY } = this.props.getScroll();
    const top = scrollY;
    const bottom = scrollY + visibleDimensions.height;

    this.trackVisibilityHelper.trackHeight = trackHeight;
    this.trackVisibilityHelper.computeVisibility(tracks, top, bottom);
    const { topIndex, bottomIndex } = this.trackVisibilityHelper;

    const visibleTracks = tracks.slice(topIndex, bottomIndex);

    return visibleTracks;
  };

  renderTrack = (track: TrackModel, index: number) => {
    const { trackHeight, visibleDimensions } = this.props;
    const { x: scrollX } = this.props.getScroll();
    const top = track.index * trackHeight;

    const trackStyle = {
      top,
    };

    return (
      <TrackContainer key={track.id} style={trackStyle}>
        <Track track={track} offsetX={scrollX} visibleWidth={visibleDimensions.width} />
      </TrackContainer>
    );
  };

  render() {
    const { dimensions, getScroll } = this.props;

    const scroll = getScroll();
    const transform = `translate3d(${-Math.round(scroll.x)}px,${-Math.round(scroll.y)}px,0px)`;
    const tracksStyle = {
      ...dimensions,
      transform,
    };

    const visibleTracks = this.getVisibleTracks();

    return (
      <TracksAreaContainer style={tracksStyle} onWheel={this.handleMouseWheel}>
        <DragToMarker />
        <TracksContainer>{visibleTracks.map(this.renderTrack)}</TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
