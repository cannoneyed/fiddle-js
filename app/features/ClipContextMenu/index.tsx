import { Container } from 'typedi';

import * as React from 'react';
import { observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { ClipStore } from 'core/stores/clips';
import { ClipSelect } from 'core/interactions/clip/select';

interface Props {
  clipId: string;
}

@observer
export default class ClipContextMenu extends React.Component<Props, {}> {
  clipSelect = Container.get(ClipSelect);
  clipStore = Container.get(ClipStore);

  deleteClip = () => {
    const { clipId } = this.props;
    const { clipStore } = this;
    clipStore.deleteClip(clipId);
  };

  render() {
    const { clipSelect } = this;
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
