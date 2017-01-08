import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { pxToInt } from 'utils/css'
import $ from 'jquery'

import Timeline from 'containers/Timeline'
import Toolbar from 'containers/Toolbar'
import TrackHeaders from 'containers/TrackHeaders'
import Tracks from 'containers/Tracks'

import styles from './styles.less'
import sequencerStyles from 'styles/sequencer.less'

@DragDropContext(HTML5Backend)
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
    return (
      <div className={ styles.pageContainer }>
        <Toolbar />
        <TrackHeaders />
        <div
          className={ styles.tracksTimelineContainer }
          ref={ ref => this.sequencerBodyRef = ref }>
          <div className={ styles.tracksTimelineWrapper }>
            <Timeline />
            <Tracks />
          </div>
        </div>
      </div>
    )
  }
}
