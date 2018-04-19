import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import DraggedClips from 'features/DraggedClips';
import Track from 'features/Track';
import VerticalGrid from 'features/TracksSection/VerticalGrid';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {
  clipDragInteraction: ClipDragInteraction;
  trackStore: TrackStore;
}

@observer
export class TracksArea extends React.Component<Props, {}> {
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksSectionLayout = Container.get(TracksSectionLayout);

  render() {
    const { clipDragInteraction, trackStore } = this.props;
    const { tracksSectionLayout } = this;
    const { trackList } = trackStore;
    const { tracksAreaHeight } = this.sequencerPageLayout;
    const { trackHeight } = tracksSectionLayout.tracks;
    const { gridCount, gridSegmentWidth } = tracksSectionLayout.grid;

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

export default connect(TracksArea, 'clipDragInteraction', 'trackStore');
