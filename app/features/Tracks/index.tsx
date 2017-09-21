import React from 'react'
import { inject, observer } from 'mobx-react'

import VerticalGrid from 'components/VerticalGrid'
import Track from 'features/Track'

import trackStore, { TrackStore } from 'core/stores/tracks'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  trackStore,
  sequencerViewStore,
}))
@observer
export default class TracksContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerViewStore, trackStore } = this.injected
    const { trackList } = trackStore
    const { gridCount, gridSegmentWidth } = sequencerViewStore

    return (
      <div className={styles.tracksAreaContainer}>
        <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        <div className={styles.tracksContainer} id="tracksContainer">
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </div>
      </div>
    )
  }
}
