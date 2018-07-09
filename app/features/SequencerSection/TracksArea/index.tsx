import * as React from 'react';
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

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  handleScroll: (deltaX: number, deltaY: number) => void;
  scrolledX: number;
  scrolledY: number;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const trackStore = Container.get(TrackStore);
  const tracksLayout = Container.get(TracksLayout);
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);
  return {
    dimensions: tracksLayout.tracksAreaDimensions,
    handleScroll: sequencerScrollInteraction.handleScroll,
    tracks: trackStore.trackList,
    scrolledX: tracksLayout.tracksScrolledX,
    scrolledY: tracksLayout.tracksScrolledY,
  };
});

@observer
export class TracksArea extends React.Component<Props & InjectedProps, {}> {
  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  render() {
    const { scrolledX, scrolledY, tracks } = this.props;
    const { height, width } = this.props.dimensions;

    const transform = `translate3d(${-Math.round(scrolledX)}px,${-Math.round(scrolledY)}px,0px)`;
    const tracksStyle = {
      height,
      transform,
      width,
    };

    return (
      <TracksAreaContainer style={tracksStyle} onWheel={this.handleMouseWheel}>
        <DragToMarker />
        <TracksContainer>
          {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
