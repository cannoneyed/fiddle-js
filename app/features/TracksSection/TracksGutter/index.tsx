import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import theme from 'styles/theme';

import TrackHeader from 'features/TracksSection/TrackHeader';

import { TrackStore } from 'core/state/stores/tracks';
import { MainPageLayout } from 'core/state/layouts/main/page';

@observer
export default class TracksGutter extends React.Component<{}, {}> {
  mainPageLayout = Container.get(MainPageLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { gutterWidth } = this.mainPageLayout;

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
