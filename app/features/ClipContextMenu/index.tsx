import * as React from 'react';
import { Container } from 'typedi';
import { inject, observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { ClipStore } from 'core/stores/clips';
import { clipSelect, ClipSelect } from 'core/interactions/clip/select';

interface Props {
  clipId: string;
}

interface Injected extends Props {
  clipSelect: ClipSelect;
}

// Use the old state injection system because the blueprint context menu portal breaks app context
@inject(() => ({
  clipSelect,
}))
@observer
export class ClipContextMenu extends React.Component<Props, {}> {
  clipStore = Container.get(ClipStore);

  get injected() {
    return this.props as Injected;
  }

  deleteClip = () => {
    const { clipId } = this.props;
    const { clipStore } = this;
    clipStore.deleteClip(clipId);
  };

  render() {
    const { clipSelect } = this.injected;
    const { deleteSelectedClips } = this.clipStore;
    const nSelectedClips = clipSelect.selectedClips.length;
    const deleteAction = nSelectedClips > 1 ? deleteSelectedClips : this.deleteClip;
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip';

    return (
      <Menu>
        <MenuItem onClick={deleteAction} icon="cross" text={deleteText} />
      </Menu>
    );
  }
}

export default ClipContextMenu;
