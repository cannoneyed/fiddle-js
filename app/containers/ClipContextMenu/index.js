import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import clipStore from 'core/clips'

@inject(() => ({
  deleteClip: clipStore.deleteClip,
}))
@observer
export default class ClipContextMenu extends Component {
  static propTypes = {
    clipId: PropTypes.string.isRequired,
    deleteClip: PropTypes.func.isRequired,
  }

  deleteClip = () => {
    const { deleteClip, clipId } = this.props
    deleteClip(clipId)
  }

  render() {
    return (
      <Menu>
        <MenuItem onClick={ this.deleteClip } iconName="cross" text="Delete" />
      </Menu>
    )
  }
}
