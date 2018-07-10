import * as React from 'react';
import { Container } from 'typedi';
import { autorun, IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { injector } from 'utils/injector';

import TrackHeader from 'features/SequencerSection/TrackHeader';

import { Track as TrackModel } from 'core/models/track';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { TrackStore } from 'core/state/stores/tracks';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

export interface Props {}
export interface InjectedProps {
  getOffset: () => number;
  gutterWidth: number;
  height: number;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const trackStore = Container.get(TrackStore);
  const tracksLayout = Container.get(TracksLayout);
  const getOffset = () => tracksLayout.tracksScrolledY;
  return {
    getOffset,
    gutterWidth: sequencerSectionLayout.gutterWidth,
    height: tracksLayout.tracksHeight,
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

  handleScrollChange = () => {
    const y = this.props.getOffset();
    const transform = `translate3d(0px,${-Math.round(y)}px,0px)`;
    const tracksGutterContainer = this.tracksGutterContainerRef.current as HTMLDivElement;
    tracksGutterContainer.style.transform = transform;
  };

  render() {
    const { gutterWidth, height, tracks } = this.props;

    const tracksGutterStyle = {
      height,
    };

    return (
      <TracksGutterContainer
        style={tracksGutterStyle}
        innerRef={this.tracksGutterContainerRef}
        width={gutterWidth}
      >
        {tracks.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </TracksGutterContainer>
    );
  }
}

export default inject(TracksGutter);

interface TracksGutterProps {
  width: number;
}
const TracksGutterContainer = styled<TracksGutterProps, 'div'>('div')`
  position: relative;
  padding: 0;
  width: ${props => props.width}px;

  box-sizing: border-box;
  background-color: ${theme.colors.black.toRgbString()};
  border-right: 1px solid ${theme.colors.mediumGray.toRgbString()};
  flex-grow: 0;
  z-index: ${theme.tracksZIndex};

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;
