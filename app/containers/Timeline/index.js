import React, { Component, PropTypes } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import styles from './styles.less'

@inject(store => ({
  gridWidth: store.sequencer.view.gridWidth,
  timelineLength: store.sequencer.state.timelineLength,
}))
@observer
export default class TimelineContainer extends Component {
  static propTypes = {
    gridWidth: PropTypes.number.isRequired,
    timelineLength: PropTypes.number.isRequired,
  }

  renderTimelineSegments() {
    const { timelineLength, gridWidth } = this.props

    const timelineSegmentStyles = {
      minWidth: gridWidth,
    }

    return range(timelineLength - 1).map(index => (
      <div
        key={ index }
        className={ styles.timelineSegment }
        style={ timelineSegmentStyles }
      >
        { index + 1 }
      </div>
    ))
  }

  render() {
    return (
      <div className={ styles.timelineContainer } id="timelineContainer">
        <div className={ styles.timelineSegmentsContainer }>
          { this.renderTimelineSegments() }
        </div>
      </div>
    )
  }
}
