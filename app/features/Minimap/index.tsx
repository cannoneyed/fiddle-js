import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class Minimap extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerViewStore } = this.injected
    const { tracksScrollPercentX, tracksViewPercentX } = sequencerViewStore

    const minimapScrollContainerStyle = {
      left: `${tracksScrollPercentX * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
    }

    return (
      <div className={styles.minimapContainer} id="minimap">
        <div
          className={styles.minimapScrollContainer}
          id="minimapScroll"
          style={minimapScrollContainerStyle}
        />
        {/* <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div> */}
      </div>
    )
  }
}
