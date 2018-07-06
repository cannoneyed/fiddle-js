import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import styled from 'styled-components';
import theme from 'styles/theme';

import { VerticalGrid } from 'components/VerticalGrid';

import { SequencerSectionLayout, Dimensions } from 'core/state/layouts/sequencer/section';
import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

interface Props {}
interface InjectedProps {
  gridDimensions: Dimensions;
  gridSegmentWidth: number;
  tracksScrolledX: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const tracksLayout = Container.get(TracksLayout);

  const { gridDimensions } = sequencerSectionLayout;

  return {
    gridDimensions: gridDimensions,
    gridSegmentWidth: gridLayout.gridSegmentWidth,
    tracksScrolledX: tracksLayout.tracksScrolledX,
  };
});

@observer
export class Grid extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { gridDimensions, gridSegmentWidth, tracksScrolledX } = this.props;

    const gridStyle = {
      height: gridDimensions.height,
      width: gridDimensions.width,
    };

    const offset = gridSegmentWidth - (tracksScrolledX % gridSegmentWidth);

    return (
      <GridContainer style={gridStyle}>
        <VerticalGrid
          gridColor={theme.colors.mediumGray.toRgbString()}
          gridSegmentWidth={gridSegmentWidth}
          height={gridDimensions.height}
          offset={offset}
          width={gridDimensions.width}
        />
      </GridContainer>
    );
  }
}

export default inject(Grid);

const GridContainer = styled.div`
  position: absolute;
  z-index: ${theme.verticalGridZIndex};
`;
