import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import TrackHeader from 'features/TrackHeader'

import trackStore, { TrackStore } from 'core/stores/tracks'
import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayoutStore: SequencerLayoutStore
  trackStore: TrackStore
}

@inject(() => ({
  trackStore,
  sequencerLayoutStore,
}))
@observer
export default class TracksGutter extends Component<ComponentProps, {}> {
  tracksGutterRef: HTMLDivElement | null

  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore, sequencerLayoutStore } = this.injected
    const { trackList } = trackStore
    const { gutterWidth } = sequencerLayoutStore

    const tracksGutterStyle = {
      minWidth: gutterWidth,
    }

    return (
      <div
        className={styles.tracksGutterContainer}
        style={tracksGutterStyle}
        ref={ref => (this.tracksGutterRef = ref)}
        id="tracksGutterContainer"
      >
        {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </div>
    )
  }
}
