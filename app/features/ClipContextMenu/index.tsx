import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Menu, MenuItem } from '@blueprintjs/core'

import { clipStore, ClipStore } from 'core/stores/clips'
import { clipSelect, ClipSelect } from 'core/stores/interactions/clips/select'

interface ComponentProps {
  clipId: string
}

interface InjectedProps extends ComponentProps {
  clipStore: ClipStore
  clipSelect: ClipSelect
}

@inject(() => ({
  clipStore,
  clipSelect,
}))
@observer
export class ClipContextMenu extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  deleteClip = () => {
    const { clipId } = this.props
    const { clipStore } = this.injected
    clipStore.deleteClip(clipId)
  }

  render() {
    const { clipStore, clipSelect } = this.injected
    const { deleteSelectedClips } = clipStore
    const nSelectedClips = clipSelect.selectedClips.length
    const deleteAction = nSelectedClips > 1 ? deleteSelectedClips : this.deleteClip
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip'

    return (
      <Menu>
        <MenuItem onClick={deleteAction} icon="cross" text={deleteText} />
      </Menu>
    )
  }
}
