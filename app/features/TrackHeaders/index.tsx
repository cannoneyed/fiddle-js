import React from 'react'
import { inject, observer } from 'mobx-react'

import TrackHeader from 'features/TrackHeader'

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
export default class TrackHeadersContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore } = this.injected
    const { trackList } = trackStore

    return (
      <div className={styles.trackHeadersSectionContainer}>
        <div className={styles.trackHeadersHeader} />
        <div className={styles.trackHeadersContainer} id="trackHeadersContainer">
          {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
        </div>
      </div>
    )
  }
}
