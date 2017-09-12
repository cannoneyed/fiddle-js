import * as React from 'react'
import { DragDropContextProvider } from 'wrappers/dnd-wrapper'
import * as $ from 'jquery'
import { pxToInt } from 'utils/css'

import Timeline from 'features/Timeline'
import Toolbar from 'features/Toolbar'
import TrackHeaders from 'features/TrackHeaders'
import Tracks from 'features/Tracks'

import { PageContainer, TracksTimelineContainer, TracksTimelineWrapper } from './styled-components'
import * as sequencerStyles from 'styles/sequencer'

export default class SequencerPage extends React.Component {
  private sequencerBodyRef: HTMLElement
  private scrollHandler: JQuery<HTMLElement>

  componentDidMount() {
    const timelineHeight = pxToInt(sequencerStyles.timelineHeight)

    // We need to manually handle the scroll positioning to ensure that the sequencer header
    // (timeline) remains locked in place to the top of the sequncer body
    this.scrollHandler = $(this.sequencerBodyRef).on('scroll', function fixTimelineScroll() {
      $('#timelineContainer')[0].style.top = `${this.scrollTop}px`
      $('#verticalGridContainer')[0].style.top = `${this.scrollTop}px`
      $('#trackHeadersContainer')[0].style.top = `${timelineHeight - this.scrollTop}px`
    })
  }

  componentWillUnmount() {
    $(this.sequencerBodyRef).off('scroll')
  }

  render() {
    return (
      <DragDropContextProvider>
        <PageContainer id="sequencerBody">
          <Toolbar />
          <TrackHeaders />
          <TracksTimelineContainer ref={(ref: any) => (this.sequencerBodyRef = ref)}>
            <TracksTimelineWrapper>
              <Timeline />
              <Tracks />
            </TracksTimelineWrapper>
          </TracksTimelineContainer>
        </PageContainer>
      </DragDropContextProvider>
    )
  }
}
