import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';

import TrackHeader from 'features/TracksSection/TrackHeader';

import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';

@observer
export default class TracksGutter extends React.Component<{}, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { gutterWidth } = this.sequencerPageLayout;

    return (
      <TracksGutterContainer width={gutterWidth} id="tracksGutter">
        {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </TracksGutterContainer>
    );
  }
}

interface TracksGutterProps {
  width: number;
}
const TracksGutterContainer = styled<TracksGutterProps, 'div'>('div')`
  position: relative;
  padding: 0;
  min-width: ${props => props.width}px;

  background-color: red;
  overflow: hidden;
  flex-grow: 0;
  z-index: ${theme.tracksZIndex};

  transform: translate3D(0, 0, 0);
  backface-visibility: hidden;
`;
