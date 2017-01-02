import React, { Component, PropTypes } from 'react'
import { range } from 'lodash'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import * as sequencerStateSelectors from 'core/sequencer/state'
import * as sequencerViewSelectors from 'core/sequencer/view'

import styles from './styles.less'

const mapStateToProps = createStructuredSelector({
  gridWidth: sequencerViewSelectors.getGridWidth,
  gridCount: sequencerViewSelectors.getGridCount,
  timelineLength: sequencerStateSelectors.getTimelineLength,
  zoomLevel: sequencerViewSelectors.getZoomLevel,
})

@connect(mapStateToProps)
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
