import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import tracksStore from 'core/tracks'
import sequencerViewStore from 'core/sequencer/view'

@inject(() => ({
  deleteTrack: tracksStore.deleteTrack,
  trackWidth: sequencerViewStore.trackWidth,
}))
@observer
export default class TrackContextMenu extends Component {
  static propTypes = {
    trackId: PropTypes.string.isRequired,
    deleteTrack: PropTypes.func.isRequired,
  }

  deleteTrack = () => {
    const { deleteTrack, trackId } = this.props
    deleteTrack(trackId)
  }

  render() {
    return (
      <Menu>
        <MenuItem onClick={ () => {} } iconName="insert" text="New Clip" />
        <MenuItem onClick={ this.deleteTrack } iconName="cross" text="Delete" />
      </Menu>
    )
  }
}
