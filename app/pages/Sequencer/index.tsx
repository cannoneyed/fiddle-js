import * as React from 'react'
import { pxToInt } from 'utils/css'
import * as $ from 'jquery'

import Timeline from 'features/Timeline'
import Toolbar from 'features/Toolbar'
import TrackHeaders from 'features/TrackHeaders'
import Tracks from 'features/Tracks'

const styles = require('./styles.less')
const sequencerStyles = require('styles/sequencer.less')

export default class SequencerPage extends React.Component {
  sequencerBodyRef: Element | null
  scrollHandler: JQuery<HTMLElement>

  componentDidMount() {
    if (this.sequencerBodyRef) {
      const timelineHeight = pxToInt(sequencerStyles.timelineHeight)
      // We need to manually handle the scroll positioning to ensure that the sequencer header
      // (timeline) remains locked in place to the top of the sequncer body
      console.log('🍕', typeof $)

      this.scrollHandler = $(this.sequencerBodyRef).scroll(function fixTimelineScroll() {
        $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
        $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
        $('#trackHeadersContainer')[0].style.top = `${timelineHeight - this.scrollTop}px`
      })
    }
  }

  componentWillUnmount() {
    if (this.sequencerBodyRef) {
      $(this.sequencerBodyRef).off('scroll')
    }
  }

  render() {
    return (
      <div className={styles.pageContainer} id="sequencerBody">
        <Toolbar />
        <TrackHeaders />
        <div className={styles.tracksTimelineContainer} ref={ref => (this.sequencerBodyRef = ref)}>
          <div className={styles.tracksTimelineWrapper}>
            <Timeline />
            <Tracks />
          </div>
        </div>
      </div>
    )
  }
}
