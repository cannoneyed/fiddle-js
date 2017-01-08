import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import clips from 'core/stores/clips'
import sequencerInteraction from 'core/stores/sequencer/interaction'

@inject(() => ({
  deleteClip: clips.deleteClip,
  deleteSelectedClips: clips.deleteSelectedClips,
  nSelectedClips: sequencerInteraction.selectedClips.length,
}))
@observer
export default class ClipContextMenu extends Component {
  static propTypes = {
    clipId: PropTypes.number.isRequired,
    deleteClip: PropTypes.func.isRequired,
    deleteSelectedClips: PropTypes.func.isRequired,
    nSelectedClips: PropTypes.number.isRequired,
  }

  deleteClip = () => {
    const { deleteClip, clipId } = this.props
    deleteClip(clipId)
  }

  render() {
    const { deleteSelectedClips, nSelectedClips } = this.props
    const deleteAction = nSelectedClips > 1 ? deleteSelectedClips : this.deleteClip
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip'

    return (
      <Menu>
        <MenuItem onClick={ deleteAction } iconName="cross" text={ deleteText } />
      </Menu>
    )
  }
}
