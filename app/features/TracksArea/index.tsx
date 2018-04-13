import * as React from 'react';
import { inject, observer } from 'mobx-react';

import { DraggedClips } from 'features/DraggedClips';
import { Track } from 'features/Track';
import { VerticalGrid } from 'features/VerticalGrid';

import { clipDrag, ClipDrag } from 'core/stores/interactions/clips/drag';
import { trackStore, TrackStore } from 'core/stores/tracks';
import { sequencerLayout, SequencerLayout } from 'core/stores/sequencer/layout';
import { sequencerView, SequencerView } from 'core/stores/sequencer/view';

const styles = require('./styles.less');

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  clipDrag: ClipDrag;
  trackStore: TrackStore;
  sequencerLayout: SequencerLayout;
  sequencerView: SequencerView;
}

@inject(() => ({
  clipDrag,
  trackStore,
  sequencerLayout,
  sequencerView,
}))
@observer
export class TracksArea extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps;
  }

  render() {
    const { sequencerLayout, sequencerView, trackStore } = this.injected;
    const { trackList } = trackStore;
    const { tracksAreaHeight } = sequencerLayout;
    const { trackHeight } = sequencerView.tracks;
    const { gridCount, gridSegmentWidth } = sequencerView.grid;

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight);
    const gridContainerStyle = {
      height: gridHeight,
    };

    const { isDragging } = clipDrag;

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
