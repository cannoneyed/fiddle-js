import * as React from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import { SequencerViewStore } from 'core/stores/sequencer/view'
import { SequencerStateStore } from 'core/stores/sequencer/state'

import { TimelineWrapper, TimelineSegmentsWrapper, TimelineSegment } from './styled-components'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  sequencerStateStore: SequencerStateStore
}

@inject('sequencerViewStore', 'sequencerStateStore')
@observer
export default class Timeline extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { timelineLength } = this.injected.sequencerStateStore
    const { gridSegmentWidth } = this.injected.sequencerViewStore

    console.log('🍕', gridSegmentWidth)

    return range(timelineLength - 1).map(index => (
      <TimelineSegment key={index} gridSegmentWidth={gridSegmentWidth}>
        {index + 1}
      </TimelineSegment>
    ))
  }

  render() {
    return (
      <TimelineWrapper id="timelineContainer">
        <TimelineSegmentsWrapper>{this.renderTimelineSegments()}</TimelineSegmentsWrapper>
      </TimelineWrapper>
    )
  }
}
