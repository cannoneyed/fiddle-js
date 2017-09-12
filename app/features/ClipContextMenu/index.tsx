import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import { ClipStore } from 'core/stores/clips'
import { ClipSelectInteraction } from 'core/interactions/clips/select'

interface ComponentProps {
  clipId: string
}

interface InjectedProps extends ComponentProps {
  clipStore: ClipStore
  clipSelectInteraction: ClipSelectInteraction
}

@inject('clipStore')
@observer
export default class ClipContextMenu extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  deleteClip = () => {
    const { clipId } = this.props
    const { deleteClip } = this.injected.clipStore

    deleteClip(clipId)
  }

  render() {
    const { deleteSelectedClips } = this.injected.clipStore
    const { selectedClips } = this.injected.clipSelectInteraction
    const nSelectedClips = selectedClips.length

    const deleteAction = nSelectedClips > 1 ? deleteSelectedClips : this.deleteClip
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip'

    return (
      <Menu>
        <MenuItem onClick={deleteAction} iconName="cross" text={deleteText} />
      </Menu>
    )
  }
}
