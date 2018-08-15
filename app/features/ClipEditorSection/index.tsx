import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';

import Empty from 'features/ClipEditorSection/components/Empty';
import Layout from 'features/ClipEditorSection/components/Layout';

import { ClipEditorCore, Provider } from 'features/ClipEditorSection/core';
import { ClipEditorState, ClipStore } from 'core';

const coreCache = new Map<Clip, ClipEditorCore>();

export interface Props {
  dimensions: Dimensions;
}
interface InjectedProps {
  clip: Clip | null;
}

interface State {
  core: ClipEditorCore | null;
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
export class ClipEditorSection extends React.Component<Props & InjectedProps, State> {
  state = {
    core: null,
  };

  static getDerivedStateFromProps(props: Props & InjectedProps) {
    const { clip, dimensions } = props;
    if (!clip) {
      return null;
    }

    const cached = coreCache.get(clip);
    let core: ClipEditorCore;
    if (cached) {
      core = cached;
    } else {
      core = new ClipEditorCore(clip, dimensions);
    }
    coreCache.set(clip, core);

    // Ensure we update properties on the core
    core.layout.setDimensions(dimensions);

    return { core };
  }

  render() {
    const { core } = this.state;
    return core !== null ? (
      <Provider value={core}>
        <Layout />
      </Provider>
    ) : (
      <Empty />
    );
  }
}

export default inject(ClipEditorSection);
