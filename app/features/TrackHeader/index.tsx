import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Track } from 'core/models/track'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {
  index: number
  track: Track
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class TrackHeaderContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { index, track } = this.props
    const { sequencerViewStore } = this.injected
    const { trackHeight } = sequencerViewStore.tracks

    const headerStyle = {
      height: trackHeight,
    }

    return (
      <div className={styles.trackHeader} style={headerStyle}>
        {index} : {track.id}
      </div>
    )
  }
}
