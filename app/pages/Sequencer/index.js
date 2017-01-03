import React, { Component } from 'react'
import { pxToInt } from 'utils/css'
import $ from 'jquery'

import Timeline from 'containers/Timeline'
import Toolbar from 'containers/Toolbar'
import TrackHeaders from 'containers/TrackHeaders'
import Tracks from 'containers/Tracks'

import styles from './styles.less'
import sequencerStyles from 'styles/sequencer.less'

export default class SequencerPage extends Component {
  componentDidMount() {
    const timelineHeight = pxToInt(sequencerStyles.timelineHeight)

    // We need to manually handle the scroll positioning to ensure that the sequencer header
    // (timeline) remains locked in place to the top of the sequncer body
    this.scrollHandler = $(this.sequencerBodyRef)
      .scroll(function fixTimelineScroll() {
        $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
        $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
        $('#trackHeadersContainer')[0].style.top = `${timelineHeight - this.scrollTop}px`
      })
  }

  componentWillUnmount() {
    $(this.sequencerBodyRef).off('scroll', this.scrollHandler)
  }

  render() {
    const makeRef = (name) => (ref) => {
      this[name] = ref
    }

    return (
      <div className={ styles.pageContainer }>
        <Toolbar />
        <TrackHeaders />
        <div className={ styles.tracksTimelineContainer } ref={ makeRef('sequencerBodyRef') }>
          <div className={ styles.tracksTimelineWrapper }>
            <Timeline />
            <Tracks />
          </div>
        </div>
      </div>
    )
  }
}
