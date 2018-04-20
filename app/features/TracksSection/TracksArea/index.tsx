import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';

import DraggedClips from 'features/DraggedClips';
import Track from 'features/Track';
import VerticalGrid from 'features/TracksSection/VerticalGrid';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { TrackStore } from 'core/stores/tracks';
import { SequencerPageLayout } from 'core/layouts/sequencer/page';
import { TracksSectionLayout } from 'core/layouts/sequencer/tracks';

import { TracksAreaContainer, GridContainer, TracksContainer } from './styled-components';

interface Props {}

@observer
export default class TracksArea extends React.Component<Props, {}> {
  clipDragInteraction = Container.get(ClipDragInteraction);
  sequencerPageLayout = Container.get(SequencerPageLayout);
  tracksSectionLayout = Container.get(TracksSectionLayout);
  trackStore = Container.get(TrackStore);

  render() {
    const { trackList } = this.trackStore;
    const { tracksAreaHeight } = this.sequencerPageLayout;
    const { trackHeight } = this.tracksSectionLayout.tracks;
    const { gridCount, gridSegmentWidth } = this.tracksSectionLayout.grid;

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight);
    const { isDragging } = this.clipDragInteraction;

    console.log('🐸', trackList.length, this.clipDragInteraction.isDragging);

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
