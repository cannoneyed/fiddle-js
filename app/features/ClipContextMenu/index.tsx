import { Container } from 'typedi';

import * as React from 'react';
import { observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { Clip } from 'core/models/clip';
import { ClipStore } from 'core/stores/clips';
import { ClipSelect } from 'core/interactions/clip/select';

interface Props {
  clip: Clip;
}

@observer
export default class ClipContextMenu extends React.Component<Props, {}> {
  clipSelect = Container.get(ClipSelect);
  clipStore = Container.get(ClipStore);

  deleteClip = () => {
    const { clip } = this.props;
    const { clipStore } = this;
    clipStore.deleteClip(clip);
  };

  deleteClips = () => {
    const { clipSelect, clipStore } = this;
    clipStore.deleteClips(clipSelect.selectedClips);
  };

  render() {
    const { clipSelect } = this;

    const nSelectedClips = clipSelect.selectedClips.length;
    const deleteAction = nSelectedClips > 1 ? this.deleteClips : this.deleteClip;
    const deleteText = nSelectedClips > 1 ? 'Delete Clips' : 'Delete Clip';

    return (
      <Menu>
        <MenuItem onClick={deleteAction} icon="cross" text={deleteText} />
      </Menu>
    );
  }
}
