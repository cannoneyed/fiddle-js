import React from 'react'
import { inject, observer } from 'mobx-react'

import VerticalGrid from 'components/VerticalGrid'
import Track from 'features/Track'

import trackStore, { TrackStore } from 'core/stores/tracks'
import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
  sequencerLayoutStore: SequencerLayoutStore
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  trackStore,
  sequencerLayoutStore,
  sequencerViewStore,
}))
@observer
export default class TracksContainer extends React.Component<ComponentProps, {}> {
  tracksAreaRef: HTMLDivElement | null

  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore, sequencerViewStore, trackStore } = this.injected
    const { trackList } = trackStore
    const { tracksAreaHeight } = sequencerLayoutStore
    const { gridCount, gridSegmentWidth, trackHeight } = sequencerViewStore

    const gridHeight = Math.max(trackList.length * trackHeight, tracksAreaHeight)
    const gridContainerStyle = {
      height: gridHeight,
    }

    return (
      <div
        className={styles.tracksAreaContainer}
        ref={ref => (this.tracksAreaRef = ref)}
        id="tracksAreaContainer"
      >
        <div className={styles.gridContainer} style={gridContainerStyle}>
          <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        </div>
        <div className={styles.tracksContainer}>
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </div>
      </div>
    )
  }
}
