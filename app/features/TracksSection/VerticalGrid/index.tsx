import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { range } from 'lodash';

interface Props {
  gridCount: number;
  gridSegmentWidth: number;
}

export default class VerticalGrid extends React.Component<Props, {}> {
  render() {
    const { gridCount, gridSegmentWidth } = this.props;

    const gridSegmentStyle = {
      minWidth: gridSegmentWidth,
    };

    return (
      <VerticalGridContainer>
        {range(gridCount).map((index: number) => (
          <GridSegment key={index} style={gridSegmentStyle} />
        ))}
      </VerticalGridContainer>
    );
  }
}

const VerticalGridContainer = styled.div`
  background-color: ${theme.colors.darkGray.toRgbString()};
  display: flex;
  flex-direction: row;
  z-index: ${theme.verticalGridZIndex};
  height: 100%;
`;

const GridSegment = styled.div`
  border-right: solid 1px ${theme.colors.mediumGray.toRgbString()};
  padding-left: 5px;

  :first-child {
    border-left: solid 1px ${theme.colors.mediumGray.toRgbString()};
  }
`;
