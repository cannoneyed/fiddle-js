import React, { Component } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import TimelineVector from 'core/models/timeline-vector'

import sequencerPositionService from 'core/services/sequencer/position'

import gridView, { GridView } from 'core/stores/sequencer/view/grid'
import timelineView, { TimelineView } from 'core/stores/sequencer/view/timeline'
import timelineState, { TimelineState } from 'core/stores/sequencer/state/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  gridView: GridView
  timelineState: TimelineState
  timelineView: TimelineView
}

@inject(() => ({
  gridView,
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
    const offsetX = sequencerPositionService.getOffsetX(dragToMarkerPosition)

    const style = {
      left: `${offsetX}px`,
    }

    return (
      <div className={styles.dragToMarkerContainer} style={style}>
        <h5>A</h5>
      </div>
    )
  }

  render() {
    const { timelineView } = this.injected
    const { dragToMarkerPosition } = timelineView

    return (
      <div className={styles.timelineContainer} id="timeline">
        {dragToMarkerPosition && this.renderDragToMarker(dragToMarkerPosition)}
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    )
  }
}
