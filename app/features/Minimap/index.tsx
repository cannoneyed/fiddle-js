import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import * as minimapWheel from 'interactions/minimap-wheel'
import * as minimapDrag from 'interactions/minimap-drag'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import minimapInteractions, { MinimapInteractions } from 'core/interactions/minimap'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  minimapInteractions: MinimapInteractions
}

@inject(() => ({
  sequencerViewStore,
  minimapInteractions,
}))
@observer
export default class Minimap extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    minimapWheel.registerHandlers()
    minimapDrag.registerHandlers()
  }

  render() {
    const { sequencerViewStore } = this.injected
    const { tracksScrollPercentX, tracksViewPercentX } = sequencerViewStore
    const { isDragging } = minimapInteractions

    // We need to compute the relative left position of the minimap container's since the scrollPercentX
    // is a normalized 0 to 1 value.
    const leftPercent = tracksScrollPercentX * (1 - tracksViewPercentX)

    const minimapScrollContainerStyle = {
      left: `${leftPercent * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
      cursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
    }

    return (
      <div className={styles.minimapContainer} id="minimap">
        <div
          className={styles.minimapScrollContainer}
          id="minimapScroll"
          style={minimapScrollContainerStyle}
        />
        {/* <div className={styles.timelineSegmentsContainer}>{this.renderTimelineSegments()}</div> */}
      </div>
    )
  }
}
