import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from '@blueprintjs/core'

import trackStore, { TrackStore } from 'core/stores/tracks'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackStore: TrackStore
}

@inject(() => ({
  trackStore,
  sequencerViewStore,
}))
@observer
export default class ToolbarContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackStore, sequencerViewStore } = this.injected
    const { zoomInHorizontal, zoomOutHorizontal } = sequencerViewStore.zoom
    const { createTrack } = trackStore

    return (
      <div className={styles.toolbarContainer}>
        <Button iconName="add" onClick={() => createTrack()}>
          Add Track
        </Button>
        <Button iconName="zoom-in" onClick={() => zoomInHorizontal()} />
        <Button iconName="zoom-out" onClick={() => zoomOutHorizontal()} />
      </div>
    )
  }
}
