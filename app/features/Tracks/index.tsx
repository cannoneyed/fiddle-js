import React from 'react'
import { inject, observer } from 'mobx-react'

import Track from 'features/Track'

import trackStore, { TrackStore } from 'core/stores/tracks'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
}

@inject(() => ({
  trackStore,
}))
@observer
export default class TracksContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore } = this.injected
    const { trackList } = trackStore

    return (
      <div className={styles.tracksWrapper}>
        <div className={styles.tracksContainer} id="tracksContainer">
          {trackList.map((track, index) => <Track track={track} index={index} key={index} />)}
        </div>
      </div>
    )
  }
}
