import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import styled from 'styled-components';
import theme from 'styles/theme';

import { Dimensions } from 'core/interfaces';
import { VerticalGrid } from 'components/VerticalGrid';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';
import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  gridSegmentWidth: number;
  getOffsetX: () => number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);
  const tracksLayout = Container.get(TracksLayout);

  const { gridDimensions } = sequencerSectionLayout;

  return {
    dimensions: gridDimensions,
    gridSegmentWidth: gridLayout.gridSegmentWidth,
    getOffsetX: () => tracksLayout.tracksScrolledX,
  };
});

@observer
export class Grid extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, gridSegmentWidth, getOffsetX } = this.props;

    const gridStyle = {
      ...dimensions,
    };

    return (
      <GridContainer style={gridStyle}>
        <VerticalGrid dimensions={dimensions} colWidth={gridSegmentWidth} getOffsetX={getOffsetX} />
      </GridContainer>
    );
  }
}

export default inject(Grid);

const GridContainer = styled.div`
  position: absolute;
  z-index: ${theme.verticalGridZIndex};
`;
