import React from 'react'
import { pxToInt } from 'utils/css'
import $ from 'jquery'
import { inject, observer } from 'mobx-react'

import Timeline from 'features/Timeline'
import Toolbar from 'features/Toolbar'
import TrackHeaders from 'features/TrackHeaders'
import Tracks from 'features/Tracks'

import VerticalGrid from 'components/VerticalGrid'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')
const sequencerStyles = require('styles/sequencer.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class SequencerPage extends React.Component<ComponentProps, {}> {
  sequencerPageRef: Element | null
  scrollHandler: JQuery<HTMLElement>

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    if (this.sequencerPageRef) {
      console.log()
      const timelineHeight = pxToInt(sequencerStyles.timeline_height)
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
    const { sequencerViewStore } = this.injected
    const { gridCount, gridSegmentWidth } = sequencerViewStore
    return (
      <div className={styles.pageContainer} id="sequencerPage">
        <Toolbar />
        <TrackHeaders />
        <div className={styles.tracksTimelineContainer} ref={ref => (this.sequencerPageRef = ref)}>
          <Timeline />
          <Tracks />
          <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        </div>
      </div>
    )
  }
}
