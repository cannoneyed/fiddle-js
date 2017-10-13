import React, { Component } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import sequencerStateStore, { SequencerStateStore } from 'core/stores/sequencer/state'

import * as styles from './styles'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  sequencerStateStore: SequencerStateStore
}

@inject(() => ({
  sequencerViewStore,
  sequencerStateStore,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { sequencerStateStore, sequencerViewStore } = this.injected

    const { timelineLength } = sequencerStateStore
    const { gridSegmentWidth } = sequencerViewStore

    const timelineSegmentStyles = {
      minWidth: gridSegmentWidth,
    }

    return range(timelineLength).map(index => (
      <div key={index} className={styles.timelineSegment} style={timelineSegmentStyles}>
        {index + 1}
      </div>
    ))
  }

  render() {
    return (
      <div className={styles.timelineContainer} id="timelineContainer">
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    )
  }
}
