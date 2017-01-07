import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import trackStore from 'core/tracks'
import clipStore from 'core/clips'

@inject(() => ({
  deleteTrack: trackStore.deleteTrack,
  createClip: clipStore.createClip,
}))
@observer
export default class TrackContextMenu extends Component {
  static propTypes = {
    createClip: PropTypes.func.isRequired,
    offsetX: PropTypes.number.isRequired,
    deleteTrack: PropTypes.func.isRequired,
    trackId: PropTypes.string.isRequired,
  }

  deleteTrack = () => {
    const { deleteTrack, trackId } = this.props
    deleteTrack(trackId)
  }

  createClip = () => {
    const { createClip, trackId, offsetX } = this.props
    createClip({ trackId, offsetX })
  }

  render() {
    return (
      <Menu>
        <MenuItem onClick={ this.createClip } iconName="insert" text="New Clip" />
        <MenuItem onClick={ this.deleteTrack } iconName="cross" text="Delete Track" />
      </Menu>
    )
  }
}
