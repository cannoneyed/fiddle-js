import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { Envelope } from 'core/models/envelope';
import { SnipLayer as SnipLayerModel } from 'core/models/clip/layer';
import { SnapToGrid } from 'core/models/snap-to-grid';

import EnvelopeEditor from 'features/EnvelopeEditor';

import { get, ClipEditorLayout, ClipEditorState } from 'features/ClipEditorSection/core';

export interface Props {
  clip: Clip;
  layer: SnipLayerModel;
}
export interface InjectedProps {
  dimensions: Dimensions;
  snapToGrid: SnapToGrid;
}

const inject = injector<Props, InjectedProps>(props => {
  const state = get(props.clip, ClipEditorState);
  const layout = get(props.clip, ClipEditorLayout);
  return {
    snapToGrid: state.snapToGrid,
    dimensions: layout.editAreaDimensions,
  };
});

@observer
export class SnipLayer extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { layer, dimensions, snapToGrid } = this.props;
    const { snip } = layer;

    const layerDimensions = {
      width: dimensions.width,
      height: 400,
    };

    if (snip.data instanceof Envelope) {
      return (
        <EnvelopeEditor dimensions={layerDimensions} envelope={snip.data} snapToGrid={snapToGrid} />
      );
    }

    return null;
  }
}

export default inject(hot(module)(SnipLayer));
