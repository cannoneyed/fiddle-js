import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import Track from 'features/SequencerSection/Track';
import VerticalGrid from 'features/SequencerSection/VerticalGrid';

import { Track as TrackModel } from 'core/models/track';
import { TrackStore } from 'core/state/stores/tracks';
import { MainPageLayout } from 'core/state/layouts/main/page';
import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

import DragToMarker from './DragToMarker';
import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {}
interface InjectedProps {
  tracks: TrackModel[];
  gridCount: number;
  gridHeight: number;
  gridSegmentWidth: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = Container.get(TracksLayout);
  const gridLayout = Container.get(GridLayout);
  const mainPageLayout = Container.get(MainPageLayout);
  const trackStore = Container.get(TrackStore);

  const { trackList } = trackStore;
  const { tracksAreaHeight } = mainPageLayout;
  const { trackHeight } = tracksLayout;
  const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight);

  return {
    gridCount: gridLayout.gridCount,
    gridHeight,
    gridSegmentWidth: gridLayout.gridSegmentWidth,
    tracks: trackList,
  };
});

@observer
export class TracksArea extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { gridCount, gridHeight, gridSegmentWidth, tracks } = this.props;

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
          {tracks.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
      </TracksAreaContainer>
    );
  }
}

export default inject(TracksArea);
