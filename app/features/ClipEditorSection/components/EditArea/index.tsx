import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Stage, Group, Layer } from 'react-konva';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { SnipLayer as SnipLayerModel } from 'core/models/clip/layer';

import SnipLayer from 'features/ClipEditorSection/components/SnipLayer';
import Timeline from 'features/ClipEditorSection/components/Timeline';

import { get, ClipEditorLayout } from 'features/ClipEditorSection/core';

interface Props {
  clip: Clip;
  dimensions: Dimensions;
}
interface Injected {
  timelineHeight: number;
}

const inject = injector<Props, Injected>(props => {
  const clipEditorLayout = get(props.clip, ClipEditorLayout);
  return {
    timelineHeight: clipEditorLayout.timelineHeight,
  };
});

@observer
export class EditArea extends React.Component<Props & Injected, {}> {
  render() {
    const { clip, dimensions, timelineHeight } = this.props;

    const layersProps = {
      y: timelineHeight,
      height: dimensions.height - timelineHeight,
    };

    const timelineDimensions = {
      height: timelineHeight,
      width: dimensions.width,
    };

    return (
      <EditAreaWrapper>
        <Stage {...dimensions}>
          <Layer>
            <Timeline clip={clip} dimensions={timelineDimensions} />
            <Group {...layersProps}>
              {clip.layers.map((layer, index) => {
                if (layer instanceof SnipLayerModel) {
                  return <SnipLayer key={index} clip={clip} layer={layer} />;
                } else {
                  return null;
                }
              })}
            </Group>
          </Layer>
        </Stage>
      </EditAreaWrapper>
    );
  }
}

export default inject(hot(module)(EditArea));

const EditAreaWrapper = styled.div`
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
