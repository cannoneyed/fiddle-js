import * as React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
// import { tap } from 'utils/tap';

import Track from 'features/SequencerSection/Track';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { Dimensions } from 'core/interfaces';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, TracksContainer } from './styled-components';

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  handleScroll: (deltaX: number, deltaY: number) => void;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const tracksLayout = Container.get(TracksLayout);
  const trackStore = Container.get(TrackStore);

  const getScroll = () => ({
    x: tracksLayout.tracksScrolledX,
    y: tracksLayout.tracksScrolledY,
  });

  const { tracksDimensions } = tracksLayout;
  const { tracksAreaDimensions } = sequencerSectionLayout;

  const dimensions = {
    height: Math.max(tracksDimensions.height, tracksAreaDimensions.height),
    width: tracksLayout.tracksDimensions.width,
  };

  // tap(() => {
  //   console.log(tracksLayout.tracksScrollPercentY, tracksLayout.tracksViewPercentY);
  // });

  return {
    dimensions,
    getScroll,
    handleScroll: sequencerScrollInteraction.handleScroll,
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
    const { tracks } = this.props;
    const { height, width } = this.props.dimensions;

    const tracksStyle = {
      height,
      width,
    };

    return (
      <TracksAreaContainer
        innerRef={this.tracksAreaContainer}
        style={tracksStyle}
        onWheel={this.handleMouseWheel}
      >
        <DragToMarker />
        <TracksContainer>
          {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
