import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Track from 'features/TracksSection/Track';
import VerticalGrid from 'features/TracksSection/VerticalGrid';

import { TrackStore } from 'core/state/stores/tracks';
import { MainPageLayout } from 'core/state/layouts/main/page';
import { SequencerLayout } from 'core/state/layouts/sequencer';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {}

@observer
export default class TracksArea extends React.Component<Props, {}> {
  tracksLayout = Container.get(TracksLayout);
  sequencerLayout = Container.get(SequencerLayout);
  mainPageLayout = Container.get(MainPageLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { tracksAreaHeight } = this.mainPageLayout;
    const { trackHeight } = this.tracksLayout;
    const { gridCount, gridSegmentWidth } = this.sequencerLayout.grid;

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight);

    const gridStyle = {
      height: gridHeight,
    };

    return (
      <TracksAreaContainer id="tracksArea">
        <DragToMarker />
        <GridContainer style={gridStyle}>
          <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        </GridContainer>
        <TracksContainer>
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}
