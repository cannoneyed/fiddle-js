import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { SnipNode } from 'core/models/graph';
import { Envelope } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';
import { Timeline } from 'core/models/timeline';

import EnvelopeEditor from 'features/EnvelopeEditor';

import {
  get,
  ClipEditorLayout,
  ClipEditorState,
  ClipEditorTimeline,
} from 'features/ClipEditorSection/core';

export interface Props {
  clip: Clip;
  node: SnipNode;
}
export interface InjectedProps {
  dimensions: Dimensions;
  snapToGrid: SnapToGrid;
  timeline: Timeline;
}

const inject = injector<Props, InjectedProps>(props => {
  const state = get(props.clip, ClipEditorState);
  const layout = get(props.clip, ClipEditorLayout);
  const { timeline } = get(props.clip, ClipEditorTimeline);
  return {
    snapToGrid: state.snapToGrid,
    dimensions: layout.editAreaDimensions,
    timeline,
  };
});

@observer
export class SnipLayer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { node, dimensions, snapToGrid, timeline } = this.props;
    const { snip } = node;

    const layerDimensions = {
      width: dimensions.width,
      height: 400,
    };

    if (snip.data instanceof Envelope) {
      return (
        <EnvelopeEditor
          dimensions={layerDimensions}
          envelope={snip.data}
          snapToGrid={snapToGrid}
          timeline={timeline}
        />
      );
    }

    return null;
  }
}

export default inject(hot(module)(SnipLayer));
