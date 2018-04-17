import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import DraggedClips from 'features/DraggedClips';
import Track from 'features/Track';
import VerticalGrid from 'features/TracksSection/VerticalGrid';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { TrackStore } from 'core/stores/tracks';
import { SequencerLayout } from 'core/stores/sequencer/layout';
import { SequencerView } from 'core/stores/sequencer/view';

import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {
  clipDragInteraction: ClipDragInteraction;
  trackStore: TrackStore;
  sequencerLayout: SequencerLayout;
  sequencerView: SequencerView;
}

@observer
export class TracksArea extends React.Component<Props, {}> {
  render() {
    const { clipDragInteraction, sequencerLayout, sequencerView, trackStore } = this.props;
    const { trackList } = trackStore;
    const { tracksAreaHeight } = sequencerLayout;
    const { trackHeight } = sequencerView.tracks;
    const { gridCount, gridSegmentWidth } = sequencerView.grid;

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight);
    const { isDragging } = clipDragInteraction;

    return (
      <TracksAreaContainer id="tracksArea">
        <GridContainer height={gridHeight}>
          <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        </GridContainer>
        <TracksContainer>
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </TracksContainer>
        {isDragging && <DraggedClips />}
      </TracksAreaContainer>
    );
  }
}

export default connect(
  TracksArea,
  'clipDragInteraction',
  'trackStore',
  'sequencerLayout',
  'sequencerView'
);
