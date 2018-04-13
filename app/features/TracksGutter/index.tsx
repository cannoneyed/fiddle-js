import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { TrackHeader } from 'features/TrackHeader'

import { trackStore, TrackStore } from 'core/stores/tracks'
import { sequencerLayout, SequencerLayout } from 'core/stores/sequencer/layout'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayout: SequencerLayout
  trackStore: TrackStore
}

@inject(() => ({
  trackStore,
  sequencerLayout,
}))
@observer
export class TracksGutter extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore, sequencerLayout } = this.injected
    const { trackList } = trackStore
    const { gutterWidth } = sequencerLayout

    const tracksGutterStyle = {
      minWidth: gutterWidth,
    }

    return (
      <div className={styles.tracksGutterContainer} style={tracksGutterStyle} id="tracksGutter">
        {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
      </div>
    )
  }
}
