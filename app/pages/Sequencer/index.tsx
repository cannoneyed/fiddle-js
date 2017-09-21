import React from 'react'
import { pxToInt } from 'utils/css'
import { inject, observer } from 'mobx-react'

import { setScrollHandler, removeScrollHandler } from './interactions/scroll-handlers'

import TimelineLayout from './layout/Timeline'
import ToolbarLayout from './layout/Toolbar'
import TracksLayout from './layout/Tracks'

import Timeline from 'features/Timeline'
import TimelineGutter from 'features/TimelineGutter'
import Toolbar from 'features/Toolbar'
import TracksGutter from 'features/TracksGutter'
import Tracks from 'features/Tracks'

// import VerticalGrid from 'components/VerticalGrid'

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
  tracksRef: Element | null
  scrollHandler: JQuery<HTMLElement>

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    if (this.tracksRef) {
      const timelineHeight = pxToInt(sequencerStyles.timeline_height)
      setScrollHandler(this.tracksRef, timelineHeight)
    }
  }

  componentWillUnmount() {
    if (this.tracksRef) {
      removeScrollHandler(this.tracksRef)
    }
  }

  render() {
    // const { sequencerViewStore } = this.injected
    // const { gridCount, gridSegmentWidth } = sequencerViewStore
    return (
      <div className={styles.pageContainer} id="sequencerPage">
        <ToolbarLayout>
          <Toolbar />
        </ToolbarLayout>
        <TimelineLayout>
          <TimelineGutter />
          <Timeline />
        </TimelineLayout>
        <TracksLayout>
          <TracksGutter />
          <Tracks />
        </TracksLayout>
      </div>
    )
  }
}
