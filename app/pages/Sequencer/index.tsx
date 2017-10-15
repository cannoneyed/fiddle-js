import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import * as tracksWheel from 'interactions/tracks-wheel'

import Minimap from 'features/Minimap'
import Timeline from 'features/Timeline'
import TimelineGutter from 'features/TimelineGutter'
import Toolbar from 'features/Toolbar'
import TracksGutter from 'features/TracksGutter'
import TracksArea from 'features/TracksArea'

import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

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
    tracksWheel.registerHandlers()
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { minimapHeight, timelineHeight, toolbarHeight, tracksAreaHeight } = sequencerLayoutStore

    const toolbarWrapperStyle = {
      height: toolbarHeight,
    }

    const timelineWrapperStyle = {
      height: timelineHeight,
    }

    const tracksAreaWrapperStyle = {
      height: tracksAreaHeight,
    }

    const minimapWrapperStyle = {
      height: minimapHeight,
    }

    return (
      <div className={styles.pageWrapper} id="sequencerPage">
        <div className={styles.toolbarWrapper} style={toolbarWrapperStyle}>
          <Toolbar />
        </div>
        <div className={styles.minimapWrapper} style={minimapWrapperStyle}>
          <Minimap />
        </div>
        <div className={styles.timelineWrapper} style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </div>
        <div className={styles.tracksAreaWrapper} style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksArea />
        </div>
      </div>
    )
  }
}
