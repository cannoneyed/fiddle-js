import React, { Component } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import Caret from 'components/Caret'

import TimelineVector from 'core/models/timeline-vector'
import sequencerPositionService from 'core/services/sequencer/position'

import gridView, { GridView } from 'core/stores/sequencer/view/grid'
import sequencerLayout, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import timelineView, { TimelineView } from 'core/stores/sequencer/view/timeline'
import timelineState, { TimelineState } from 'core/stores/sequencer/state/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  gridView: GridView
  sequencerLayout: SequencerLayoutStore
  timelineState: TimelineState
  timelineView: TimelineView
}

@inject(() => ({
  gridView,
  sequencerLayout,
  timelineState,
  timelineView,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { gridView, timelineState } = this.injected

    const timelineLength = timelineState.length
    const { gridSegmentWidth } = gridView

    const timelineSegmentStyles = {
      minWidth: gridSegmentWidth,
    }

    return range(timelineLength).map(index => (
      <div key={index} className={styles.timelineSegment} style={timelineSegmentStyles}>
        {index + 1}
      </div>
    ))
  }

  renderDragToMarker(dragToMarkerPosition: TimelineVector) {
    const timelineHeight = sequencerLayout.timelineHeight
    const offsetX = sequencerPositionService.getOffsetX(dragToMarkerPosition)

    const caretSize = 10

    const style = {
      left: offsetX - caretSize / 2 - 1,
      top: timelineHeight - caretSize + 2,
    }

    return (
      <div className={styles.dragToMarkerContainer} style={style}>
        <Caret size={caretSize} />
      </div>
    )
  }

  render() {
    const { timelineView } = this.injected
    const { dragToMarker } = timelineView

    return (
      <div className={styles.timelineContainer} id="timeline">
        {dragToMarker && this.renderDragToMarker(dragToMarker)}
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    )
  }
}
