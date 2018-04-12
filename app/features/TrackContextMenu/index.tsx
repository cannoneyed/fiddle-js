import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import trackStore, { TrackStore } from 'core/stores/tracks'
import clipStore, { ClipStore } from 'core/stores/clips'
import sequencerPositionService from 'core/services/sequencer/position'

interface ComponentProps {
  trackId: string
  offsetX: number
}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
  clipStore: ClipStore
}

@inject(() => ({
  trackStore,
  clipStore,
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
    const { clipStore } = this.injected
    const position = sequencerPositionService.getTimelineVector(offsetX)

    clipStore.createClip({ trackId, position })
  }

  render() {
    return (
      <Menu>
        <MenuItem onClick={this.createClip} icon="insert" text="New Clip" />
        <MenuItem onClick={this.deleteTrack} icon="cross" text="Delete Track" />
      </Menu>
    )
  }
}
