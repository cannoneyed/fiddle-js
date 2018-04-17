import * as React from 'react';
import { observer } from 'mobx-react';
import { connect } from 'utils/connect';
import { Menu, MenuItem } from '@blueprintjs/core';

import { ClipStore } from 'core/stores/clips';
import { ClipSelect } from 'core/interactions/clip/select';

interface Props {
  clipId: string;
  clipStore: ClipStore;
  clipSelect: ClipSelect;
}

@observer
export class ClipContextMenu extends React.Component<Props, {}> {
  deleteClip = () => {
    const { clipId, clipStore } = this.props;
    clipStore.deleteClip(clipId);
  };

  render() {
    const { clipStore, clipSelect } = this.props;
    const { deleteSelectedClips } = clipStore;
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

export default connect(ClipContextMenu, 'clipStore', 'clipSelect');
