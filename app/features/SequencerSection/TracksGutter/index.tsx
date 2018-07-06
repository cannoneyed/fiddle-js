import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { injector } from 'utils/injector';

import TrackHeader from 'features/SequencerSection/TrackHeader';

import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

export interface Props {}
export interface InjectedProps {
  gutterWidth: number;
  tracks: TrackModel[];
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const trackStore = Container.get(TrackStore);
  return {
    gutterWidth: sequencerSectionLayout.gutterWidth,
    tracks: trackStore.trackList,
  };
});

@observer
export class TracksGutter extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { gutterWidth, tracks } = this.props;

    return (
      <TracksGutterContainer width={gutterWidth} id="tracksGutter">
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
  overflow: hidden;
  flex-grow: 0;
  z-index: ${theme.tracksZIndex};

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;
