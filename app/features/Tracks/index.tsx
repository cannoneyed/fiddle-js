import * as React from 'react'
import { inject, observer } from 'mobx-react'

import Track from 'features/Track'
import VerticalGrid from 'components/VerticalGrid'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import trackStore, { TrackStore } from 'core/stores/tracks'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackStore: TrackStore
}

@inject(() => ({
  sequencerViewStore,
  trackStore,
}))
@observer
export default class TracksContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore, sequencerViewStore } = this.injected
    const { trackList } = trackStore
    const { gridCount, gridSegmentWidth } = sequencerViewStore

    return (
      <div className={styles.tracksWrapper}>
        <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        <div className={styles.tracksContainer} id="tracksContainer">
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </div>
      </div>
    )
  }
}
