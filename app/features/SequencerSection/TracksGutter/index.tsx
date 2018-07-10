import * as React from 'react';
import { Container } from 'typedi';
import { autorun, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { injector } from 'utils/injector';

import { Track as TrackModel } from 'core/models/track';
import { Dimensions } from 'core/interfaces';

import TrackHeader from 'features/SequencerSection/TrackHeader';

import { SequencerScrollInteraction } from 'core/interactions/sequencer/scroll';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';
import { TrackStore } from 'core/state/stores/tracks';

export interface Props {}
export interface InjectedProps {
  dimensions: Dimensions;
  getOffset: () => number;
  handleScroll: (deltaX: number, deltaY: number) => void;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const sequencerScrollInteraction = Container.get(SequencerScrollInteraction);
  const trackStore = Container.get(TrackStore);
  const tracksLayout = Container.get(TracksLayout);
  const getOffset = () => tracksLayout.tracksScrolledY;

  const { tracksDimensions } = tracksLayout;
  const { tracksAreaDimensions } = sequencerSectionLayout;
  const height = Math.max(tracksDimensions.height, tracksAreaDimensions.height);
  const dimensions = {
    height,
    width: sequencerSectionLayout.gutterWidth,
  };

  return {
    dimensions,
    getOffset,
    handleScroll: sequencerScrollInteraction.handleScroll,
    tracks: trackStore.trackList,
  };
});

@observer
export class TracksGutter extends React.Component<Props & InjectedProps, {}> {
  private disposeScrollObserver: IReactionDisposer;
  private tracksGutterContainerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.handleScrollChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(0, deltaY);
  };

  handleScrollChange = () => {
    const y = this.props.getOffset();
    const transform = `translate3d(0px,${-Math.round(y)}px,0px)`;
    const tracksGutterContainer = this.tracksGutterContainerRef.current as HTMLDivElement;
    tracksGutterContainer.style.transform = transform;
  };

  render() {
    const { tracks } = this.props;
    const { height, width } = this.props.dimensions;

    const tracksGutterStyle = {
      height,
      width,
    };

    return (
      <TracksGutterContainer
        style={tracksGutterStyle}
        innerRef={this.tracksGutterContainerRef}
        onWheel={this.handleMouseWheel}
      >
        {tracks.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </TracksGutterContainer>
    );
  }
}

export default inject(TracksGutter);

const TracksGutterContainer = styled.div`
  position: relative;
  padding: 0;

  box-sizing: border-box;
  background-color: ${theme.colors.black.toRgbString()};
  border-right: 1px solid ${theme.colors.mediumGray.toRgbString()};
  flex-grow: 0;
  z-index: ${theme.tracksZIndex};

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;
