import React, { Component } from 'react'
import { noop, range } from 'lodash'
import { inject, observer } from 'mobx-react'

import Caret from 'components/Caret'

import TimelineVector from 'core/classes/timeline-vector'
import sequencerPositionService from 'core/services/sequencer/position'

import gridView, { GridView } from 'core/stores/sequencer/view/grid'
import sequencerLayout, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import timelineView, { TimelineView } from 'core/stores/sequencer/view/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  gridView: GridView
  sequencerLayout: SequencerLayoutStore
  timelineView: TimelineView
}

@inject(() => ({
  gridView,
  sequencerLayout,
  timelineView,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { gridView } = this.injected

    const { division, divisionWidth, nDivisions } = gridView

    return range(nDivisions).map(n => {
      const div = division.multiply(n, 1).reduce()
      const { denominator } = div
      noop(denominator)

      const timelineSegmentStyle = {
        minWidth: divisionWidth,
        height: '50%',
      }

      return (
        <div key={n} className={styles.timelineSegment} style={timelineSegmentStyle}>
          {n + 1}
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
