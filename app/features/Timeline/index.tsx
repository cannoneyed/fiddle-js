import React, { Component } from 'react'
import { noop, range } from 'lodash'
import { inject, observer } from 'mobx-react'

import { DragToMarker } from './DragToMarker'

import { gridView, GridView } from 'core/stores/sequencer/view/grid'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  gridView: GridView
}

@inject(() => ({
  gridView,
}))
@observer
export class Timeline extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  renderTimelineSegments() {
    const { gridView } = this.injected
    const { division, divisionWidth, nDivisions } = gridView

    return range(nDivisions).map(n => {
      const { numerator, denominator } = division.multiply(n, 1).reduce()
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

      const isMajorDivision = denominator === 1 && n % 2 == 0

      const timelineLabel = isMajorDivision ? numerator + 1 : null
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

  render() {
    return (
      <div className={styles.timelineContainer} id="timeline">
        <DragToMarker />
        <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div>
      </div>
    )
  }
}
