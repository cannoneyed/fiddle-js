import React, { Component, PropTypes } from 'react'
import { range } from 'lodash'
import { inject, observer } from 'mobx-react'

import sequencerViewStore from 'core/sequencer/view'
import sequencerStateStore from 'core/sequencer/state'

import styles from './styles.less'

@inject(() => ({
  gridSegmentWidth: sequencerViewStore.gridSegmentWidth,
  timelineLength: sequencerStateStore.timelineLength,
}))
@observer
export default class TimelineContainer extends Component {
  static propTypes = {
    gridSegmentWidth: PropTypes.number.isRequired,
    timelineLength: PropTypes.number.isRequired,
  }

  renderTimelineSegments() {
    const { timelineLength, gridSegmentWidth } = this.props

    const timelineSegmentStyles = {
      minWidth: gridSegmentWidth,
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
