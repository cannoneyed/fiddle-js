import React, { Component } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import timelineState, { TimelineState } from 'core/stores/sequencer/state/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  timelineState: TimelineState
}

@inject(() => ({
  sequencerViewStore,
  timelineState,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { timelineState, sequencerViewStore } = this.injected

    const timelineLength = timelineState.length
    const { gridSegmentWidth } = sequencerViewStore.grid

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
      <div className={styles.timelineContainer} id="timeline">
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    )
  }
}
