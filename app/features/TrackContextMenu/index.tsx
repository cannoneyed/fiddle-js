import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import trackStore, { TrackStore } from 'core/stores/tracks'
import clipStore, { ClipStore } from 'core/stores/clips'
import sequencerPositionStore, { SequencerPositionStore } from 'core/stores/sequencer/position'

interface ComponentProps {
  trackId: string
  offsetX: number
}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
  clipStore: ClipStore
  sequencerPositionStore: SequencerPositionStore
}

@inject(() => ({
  trackStore,
  clipStore,
  sequencerPositionStore,
}))
@observer
export default class TrackContextMenu extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  deleteTrack = () => {
    const { trackId } = this.props
    const { trackStore } = this.injected
    trackStore.deleteTrack(trackId)
  }

  createClip = () => {
    const { trackId, offsetX } = this.props
    const { clipStore, sequencerPositionStore } = this.injected
    const position = sequencerPositionStore.getPositionFromOffset(offsetX)

    clipStore.createClip({ trackId, position })
  }

  render() {
    return (
      <Menu>
        <MenuItem onClick={this.createClip} iconName="insert" text="New Clip" />
        <MenuItem onClick={this.deleteTrack} iconName="cross" text="Delete Track" />
      </Menu>
    )
  }
}
