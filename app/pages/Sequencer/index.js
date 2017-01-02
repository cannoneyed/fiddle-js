import React, { Component } from 'react'
import $ from 'jquery'

import Timeline from 'containers/Timeline'
import Toolbar from 'containers/Toolbar'
import TrackHeaders from 'containers/TrackHeaders'
import Tracks from 'containers/Tracks'

import styles from './styles.less'

export default class SequencerPage extends Component {
  componentDidMount() {
    // We need to manually handle the scroll positioning to ensure that the sequencer header
    // (timeline) remains locked in place to the top of the sequncer body
    this.scrollHandler = $(this.sequencerBodyRef)
      .scroll(function fixTimelineScroll() {
        $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
        $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
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
