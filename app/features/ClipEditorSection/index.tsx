import * as React from 'react';
import { Container } from 'libs/typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';

import Empty from 'features/ClipEditorSection/components/Empty';
import Layout from 'features/ClipEditorSection/components/Layout';

import { ClipEditorState, ClipStore } from 'core';
import { deriveStateFromProps } from 'features/ClipEditorSection/core';

export interface Props {
  dimensions: Dimensions;
}
export interface InjectedProps {
  clip: Clip | null;
}

const inject = injector<Props, InjectedProps>(_ => {
  const clipEditorState = Container.get(ClipEditorState);
  const clipStore = Container.get(ClipStore);
  const clipId = clipEditorState.selectedClipId;

  return {
    clip: clipStore.getClipById(clipId),
  };
});

@observer
export class ClipEditorSection extends React.Component<Props & InjectedProps, {}> {
  state = {};

  static getDerivedStateFromProps(props: Props & InjectedProps) {
    const { clip } = props;
    if (clip) {
      deriveStateFromProps(clip, props);
    }
    return {};
  }

  render() {
    const { clip } = this.props;
    return clip !== null ? <Layout clip={clip} /> : <Empty />;
  }
}

export default inject(ClipEditorSection);
