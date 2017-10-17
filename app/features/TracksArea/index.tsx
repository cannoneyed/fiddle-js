import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import DraggedClips from 'features/DraggedClips'
import Track from 'features/Track'
import VerticalGrid from 'components/VerticalGrid'

import clipDragInteraction, { ClipDragInteraction } from 'core/interactions/clips/drag'
import trackStore, { TrackStore } from 'core/stores/tracks'
import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  clipDragInteraction: ClipDragInteraction
  trackStore: TrackStore
  sequencerLayoutStore: SequencerLayoutStore
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  clipDragInteraction,
  trackStore,
  sequencerLayoutStore,
  sequencerViewStore,
}))
@observer
export default class TracksAreaContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore, sequencerViewStore, trackStore } = this.injected
    const { trackList } = trackStore
    const { tracksAreaHeight } = sequencerLayoutStore
    const { trackHeight } = sequencerViewStore.tracks
    const { gridCount, gridSegmentWidth } = sequencerViewStore.grid

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight)
    const gridContainerStyle = {
      height: gridHeight,
    }

    const { isDragging } = clipDragInteraction

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
    )
  }
}
