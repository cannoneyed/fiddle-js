import { Container } from 'typedi';

import * as React from 'react';
import { observer } from 'mobx-react';
import { Menu, MenuItem } from '@blueprintjs/core';

import { Clip } from 'core/models/clip';
import { ClipEditorState } from 'core/state/app/clip-editor';
import { ClipStore } from 'core/state/stores/clips';
import { ClipSelectInteraction } from 'core/interactions//clip/select';

interface Props {
  clip: Clip;
}

@observer
export default class ClipContextMenu extends React.Component<Props, {}> {
  clipSelect = Container.get(ClipSelectInteraction);
  clipStore = Container.get(ClipStore);
  clipEditorState = Container.get(ClipEditorState);

  editClip = () => {
    const { clip } = this.props;
    this.clipEditorState.selectClip(clip.id);
  };

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
        <MenuItem onClick={this.editClip} icon="edit" text="edit" />
        <MenuItem onClick={deleteAction} icon="cross" text={deleteText} />
      </Menu>
    );
  }
}
