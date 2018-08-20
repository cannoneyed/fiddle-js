import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

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

    const layersStyle = {
      top: timelineHeight,
      height: dimensions.height - timelineHeight,
    };

    const timelineDimensions = {
      height: timelineHeight,
      width: dimensions.width,
    };

    return (
      <EditAreaWrapper>
        <TimelineWrapper style={timelineDimensions}>
          <Timeline clip={clip} dimensions={timelineDimensions} />
        </TimelineWrapper>
        <LayersWrapper style={layersStyle}>
          {clip.layers.map((layer, index) => {
            if (layer instanceof SnipLayerModel) {
              return <SnipLayer key={index} clip={clip} layer={layer} />;
            } else {
              return null;
            }
          })}
        </LayersWrapper>
      </EditAreaWrapper>
    );
  }
}

export default inject(EditArea);

const LayersWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const TimelineWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const EditAreaWrapper = styled.div`
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
