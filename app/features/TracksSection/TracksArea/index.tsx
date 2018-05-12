import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import Track from 'features/TracksSection/Track';
import VerticalGrid from 'features/TracksSection/VerticalGrid';

import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {}

@observer
export default class TracksArea extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksSectionLayout = Container.get(TracksSectionLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { tracksAreaHeight } = this.sequencerPageLayout;
    const { trackHeight } = this.tracksSectionLayout.tracks;
    const { gridCount, gridSegmentWidth } = this.tracksSectionLayout.grid;

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
