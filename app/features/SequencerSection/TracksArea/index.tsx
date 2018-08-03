import * as React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Track from 'features/SequencerSection/Track';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { Dimensions } from 'core/interfaces';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, TracksContainer } from './styled-components';

interface Props {
  screenDimensions: Dimensions;
}

interface InjectedProps {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  handleScroll: (deltaX: number, deltaY: number) => void;
  trackHeight: number;
  tracks: TrackModel[];
}

const TRACK_VISIBLE_BUFFER = 2;

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
  private disposeScrollObserver: IReactionDisposer;
  private tracksAreaContainer = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.handleScrollChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  handleScrollChange = () => {
    const { x, y } = this.props.getScroll();
    const transform = `translate3d(${-Math.round(x)}px,${-Math.round(y)}px,0px)`;
    const tracksAreaContainer = this.tracksAreaContainer.current as HTMLDivElement;
    tracksAreaContainer.style.transform = transform;
  };

  render() {
    const { screenDimensions, tracks, trackHeight } = this.props;
    const { height, width } = this.props.dimensions;

    const tracksStyle = {
      height,
      width,
    };

    const scrollY = this.props.getScroll().y;

    const top = -TRACK_VISIBLE_BUFFER * trackHeight;
    const bottom = screenDimensions.height + TRACK_VISIBLE_BUFFER * trackHeight;
    const visibleTracks = tracks.filter((_, index) => {
      const screenY = index * trackHeight - scrollY;
      return screenY > top && screenY < bottom;
    });

    return (
      <TracksAreaContainer
        innerRef={this.tracksAreaContainer}
        style={tracksStyle}
        onWheel={this.handleMouseWheel}
      >
        <DragToMarker />
        <TracksContainer>
          {visibleTracks.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
