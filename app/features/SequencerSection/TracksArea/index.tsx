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

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  getScrollObservables: () => { x: number; y: number };
  handleScroll: (deltaX: number, deltaY: number) => void;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const trackStore = Container.get(TrackStore);
  const tracksLayout = Container.get(TracksLayout);
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);

  const getScrollObservables = () => ({
    x: tracksLayout.tracksScrolledX,
    y: tracksLayout.tracksScrolledY,
  });

  return {
    dimensions: tracksLayout.tracksAreaDimensions,
    getScrollObservables,
    handleScroll: sequencerScrollInteraction.handleScroll,
    tracks: trackStore.trackList,
  };
});

@observer
export class TracksArea extends React.Component<Props & InjectedProps, {}> {
  private disposeScrollObserver: IReactionDisposer;
  private tracksAreaContainer: React.RefObject<HTMLDivElement>;

  constructor(props: Props & InjectedProps) {
    super(props);
    this.tracksAreaContainer = React.createRef<HTMLDivElement>();
  }

  private getTracksAreaContainer() {
    return this.tracksAreaContainer.current as HTMLDivElement;
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  handleScrollChange = () => {
    const { x, y } = this.props.getScrollObservables();
    const transform = `translate3d(${-Math.round(x)}px,${-Math.round(y)}px,0px)`;
    const tracksAreaContainer = this.getTracksAreaContainer();
    tracksAreaContainer.style.transform = transform;
  };

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.handleScrollChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

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
