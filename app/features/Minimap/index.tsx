import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import * as minimapScroll from 'interactions/minimap/scroll'
import * as minimapDrag from 'interactions/minimap/drag'

import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import minimapInteractions, { MinimapInteractions } from 'core/stores/interactions/minimap'

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
  unregisterScrollHandlers: minimapScroll.UnregisterHandlers
  unregisterDragHandlers: minimapDrag.UnregisterHandlers

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    this.unregisterScrollHandlers = minimapScroll.registerHandlers()
    this.unregisterDragHandlers = minimapDrag.registerHandlers()
  }

  componentWillUnmount() {
    this.unregisterScrollHandlers()
    this.unregisterDragHandlers()
  }

  render() {
    const { sequencerViewStore } = this.injected
    const { tracksScrollPercentX, tracksViewPercentX } = sequencerViewStore.tracks

    // We need to compute the relative left position of the minimap container's since the scrollPercentX
    // is a normalized 0 to 1 value.
    const leftPercent = tracksScrollPercentX * (1 - tracksViewPercentX)

    const minimapScrollContainerStyle = {
      left: `${leftPercent * 100}%`,
      width: `${tracksViewPercentX * 100}%`,
    }

    return (
      <div className={styles.minimapContainer} id="minimap">
        <div
          className={styles.minimapScrollContainer}
          id="minimapScroll"
          style={minimapScrollContainerStyle}
        />
      </div>
    )
  }
}
