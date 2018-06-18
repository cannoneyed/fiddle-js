import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
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

const inject = injector<Props, InjectedProps>(props => {
  const { clip } = props;
  const clipSelect = Container.get(ClipSelectInteraction);
  const clipStore = Container.get(ClipStore);
  const clipEditorState = Container.get(ClipEditorState);

  return {
    deleteClip: () => clipStore.deleteClip(clip),
    deleteClips: () => clipStore.deleteClips(clipSelect.selectedClips),
    editClip: () => clipEditorState.setClipEditing(clip.id),
    nSelectedClips: clipSelect.selectedClips.length,
  };
});

@observer
export class ClipContextMenu extends React.Component<Props & InjectedProps, {}> {
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

export default inject(ClipContextMenu);
