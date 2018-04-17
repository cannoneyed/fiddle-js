import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';

import DraggedClips from 'features/DraggedClips';
import Track from 'features/Track';
import VerticalGrid from 'features/VerticalGrid';

import { ClipDragInteraction } from 'core/interactions/clip/drag';
import { TrackStore } from 'core/stores/tracks';
import { SequencerLayout } from 'core/stores/sequencer/layout';
import { SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

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
    const gridContainerStyle = {
      height: gridHeight,
    };

    const { isDragging } = clipDragInteraction;

    return (
      <div className={styles.tracksAreaContainer} id="tracksArea">
        <div className={styles.gridContainer} style={gridContainerStyle}>
          <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        </div>
        <div className={styles.tracksContainer}>
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </div>
        {isDragging && <DraggedClips />}
      </div>
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
