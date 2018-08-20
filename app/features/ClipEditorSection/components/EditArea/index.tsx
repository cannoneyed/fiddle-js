import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Clip } from 'core/models/clip';
import { SnipLayer as SnipLayerModel } from 'core/models/clip/layer';

import SnipLayer from 'features/ClipEditorSection/components/SnipLayer';

export interface Props {
  clip: Clip;
  dimensions: Dimensions;
}

@observer
export class EditArea extends React.Component<Props, {}> {
  render() {
    const { clip } = this.props;
    return (
      <EditAreaContainer id="editArea">
        <EditAreaBody>
          {clip.layers.map((layer, index) => {
            if (layer instanceof SnipLayerModel) {
              return <SnipLayer key={index} clip={clip} layer={layer} />;
            } else {
              return null;
            }
          })}
        </EditAreaBody>
      </EditAreaContainer>
    );
  }
}

export default EditArea;

const EditAreaBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const EditAreaContainer = styled.div`
  flex-grow: 1;
  background-color: ${theme.colors.black.toRgbString()};
  position: relative;
`;
