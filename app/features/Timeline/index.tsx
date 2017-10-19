import React, { Component } from 'react'
import { noop, range } from 'lodash'
import { inject, observer } from 'mobx-react'

import Caret from 'components/Caret'

import TimelineVector from 'core/classes/timeline-vector'
import sequencerPositionService from 'core/services/sequencer/position'

import zoomStore, { ZoomStore } from 'core/stores/sequencer/view/zoom'
import gridView, { GridView } from 'core/stores/sequencer/view/grid'
import sequencerLayout, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import timelineView, { TimelineView } from 'core/stores/sequencer/view/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  gridView: GridView
  sequencerLayout: SequencerLayoutStore
  timelineView: TimelineView
  zoomStore: ZoomStore
}

@inject(() => ({
  gridView,
  sequencerLayout,
  timelineView,
  zoomStore,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { gridView } = this.injected

    const { barWidth, division, divisionWidth, nDivisions } = gridView
    console.log(zoomStore.horizontal.level, barWidth, division)

    return range(nDivisions).map(n => {
      const div = division.multiply(n, 1).reduce()
      const { numerator, denominator } = div
      noop(numerator, denominator)

      const timelineSegmentStyle = {
        minWidth: divisionWidth,
      }

      const timelineDividerStyle = {
        height: 10,
        width: 1,
        borderLeft: `1px solid white`,
        marginLeft: -1,
      }

      const timelineLabel = denominator === 1 ? numerator + 1 : null
      const timelineLabelStyle = {
        marginLeft: 2,
        fontSize: 10,
      }

      return (
        <div key={n} className={styles.timelineSegment} style={timelineSegmentStyle}>
          <div style={timelineDividerStyle} />
          {timelineLabel && <div style={timelineLabelStyle}>{timelineLabel}</div>}
        </div>
      )
    })
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
