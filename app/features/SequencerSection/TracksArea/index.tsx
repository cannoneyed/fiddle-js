import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Track from 'features/SequencerSection/Track';
import VerticalGrid from 'features/SequencerSection/VerticalGrid';

import { TrackStore } from 'core/state/stores/tracks';
import { MainPageLayout } from 'core/state/layouts/main/page';
import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {}

@observer
export default class TracksArea extends React.Component<Props, {}> {
  tracksLayout = Container.get(TracksLayout);
  gridLayout = Container.get(GridLayout);
  mainPageLayout = Container.get(MainPageLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { tracksAreaHeight } = this.mainPageLayout;
    const { trackHeight } = this.tracksLayout;
    const { gridCount, gridSegmentWidth } = this.gridLayout;

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
