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

interface InjectedProps {
  deleteClip: () => void;
  deleteClips: () => void;
  editClip: () => void;
  nSelectedClips: number;
}

@observer
export default class ClipContextMenuWrapper extends React.Component<Props, {}> {
  clipSelect = Container.get(ClipSelectInteraction);
  clipStore = Container.get(ClipStore);
  clipEditorState = Container.get(ClipEditorState);

  render() {
    const { clip } = this.props;
    const nextProps = {
      ...this.props,
      deleteClip: () => this.clipStore.deleteClip(clip),
      deleteClips: () => this.clipStore.deleteClips(this.clipSelect.selectedClips),
      editClip: () => this.clipEditorState.setClipEditing(clip.id),
      nSelectedClips: this.clipSelect.selectedClips.length,
    };
    return <ClipContextMenu {...nextProps} />;
  }
}

@observer
export class ClipContextMenu extends React.Component<Props & InjectedProps, {}> {
  clipSelect = Container.get(ClipSelectInteraction);
  clipStore = Container.get(ClipStore);
  clipEditorState = Container.get(ClipEditorState);

  editClip = () => {
    this.props.editClip();
  };

  deleteClip = () => {
    this.props.deleteClip();
  };

  deleteClips = () => {
    this.props.deleteClips();
  };

  render() {
    const { nSelectedClips } = this.props;
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
