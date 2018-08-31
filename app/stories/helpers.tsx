import * as React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import styled from 'styled-components';
import theme from 'styles/theme';
import { initializeLogger } from 'utils/logger';

import { Dimensions } from 'core/interfaces';

initializeLogger();

export const Wrapper = styled.div`
  background-color: #111;
  height: 90vh;
  padding: 20px;
`;

export interface KonvaWrapperProps {
  children: any;
  dimensions: Dimensions;
}

export class KonvaWrapper extends React.Component<KonvaWrapperProps, {}> {
  render() {
    const { children, dimensions } = this.props;
    return (
      <Wrapper>
        <Stage {...dimensions}>
          <Layer>
            <Rect {...dimensions} fill={theme.colors.darkGray.toRgbString()} />
          </Layer>
          <Layer>{children}</Layer>
        </Stage>
      </Wrapper>
    );
  }
}
