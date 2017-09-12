import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import { TrackStore } from 'core/stores/tracks'
import { ClipStore } from 'core/stores/clips'

interface ComponentProps {
  trackId: string
  offsetX: number
}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
  clipStore: ClipStore
}

@inject('trackStore', 'clipStore')
@observer
export default class TrackContextMenu extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  deleteTrack = () => {
    const { trackId } = this.props
    const { deleteTrack } = this.injected.trackStore
    deleteTrack(trackId)
  }

  createClip = () => {
    const { trackId, offsetX } = this.props
    const { createClip } = this.injected.clipStore
    createClip({ trackId, offsetX })
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
