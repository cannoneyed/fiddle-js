import React from 'react'
import { pxToInt } from 'utils/css'
import $ from 'jquery'

import Timeline from 'features/Timeline'
import Toolbar from 'features/Toolbar'
import TrackHeaders from 'features/TrackHeaders'
import Tracks from 'features/Tracks'

const styles = require('./styles.less')
const sequencerStyles = require('styles/sequencer.less')

export default class SequencerPage extends React.Component {
  sequencerPageRef: Element | null
  scrollHandler: JQuery<HTMLElement>

  componentDidMount() {
    if (this.sequencerPageRef) {
      const timelineHeight = pxToInt(sequencerStyles.timelineHeight)
      // We need to manually handle the scroll positioning to ensure that the sequencer header
      // (timeline) remains locked in place to the top of the sequncer body

      this.scrollHandler = $(this.sequencerPageRef).scroll(function fixTimelineScroll() {
        $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
        $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
        $('#trackHeadersContainer')[0].style.top = `${timelineHeight - this.scrollTop}px`
      })
    }
  }

  componentWillUnmount() {
    if (this.sequencerPageRef) {
      $(this.sequencerPageRef).off('scroll')
    }
  }

  render() {
    return (
      <div className={styles.pageContainer} id="sequencerPage">
        <Toolbar />
        <TrackHeaders />
        <div className={styles.tracksTimelineContainer} ref={ref => (this.sequencerPageRef = ref)}>
          <div className={styles.tracksTimelineWrapper}>
            <Timeline />
            <Tracks />
          </div>
        </div>
      </div>
    )
  }
}
