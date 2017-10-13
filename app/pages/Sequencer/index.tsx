import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { getElementsByIds } from 'utils/document'
import { syncScroll, unsyncScroll } from './interactions/sync-scroll'

import Timeline from 'features/Timeline'
import TimelineGutter from 'features/TimelineGutter'
import Toolbar from 'features/Toolbar'
import TracksGutter from 'features/TracksGutter'
import TracksArea from 'features/TracksArea'

// import VerticalGrid from 'components/VerticalGrid'

import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

import * as styles from './styles'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayoutStore: SequencerLayoutStore
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerLayoutStore,
  sequencerViewStore,
}))
@observer
export default class SequencerPage extends Component<ComponentProps, {}> {
  tracksRef: Element | null
  scrollHandler: JQuery<HTMLElement>

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    // Sync the scroll between the
    const xy = getElementsByIds('tracksAreaContainer')
    const x = getElementsByIds('timelineContainer')
    const y = getElementsByIds('tracksGutterContainer')

    syncScroll({ xy, x, y })
  }

  componentWillUnmount() {
    unsyncScroll()
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { timelineHeight, toolbarHeight, tracksAreaHeight } = sequencerLayoutStore

    const toolbarWrapperStyle = {
      height: toolbarHeight,
    }

    const timelineWrapperStyle = {
      height: timelineHeight,
    }

    const tracksAreaStyle = {
      height: tracksAreaHeight,
    }

    // const { gridCount, gridSegmentWidth } = sequencerViewStore
    return (
      <div className={styles.pageWrapper} id="sequencerPage">
        <div className={styles.toolbarWrapper} style={toolbarWrapperStyle}>
          <Toolbar />
        </div>
        <div className={styles.timelineWrapper} style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </div>
        <div className={styles.tracksAreaWrapper} style={tracksAreaStyle}>
          <TracksGutter />
          <TracksArea />
        </div>
      </div>
    )
  }
}
