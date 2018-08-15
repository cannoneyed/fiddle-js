import * as React from 'react';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Coordinates, Dimensions } from 'core/interfaces';
import { VerticalGrid } from 'components/VerticalGrid';

import { GridLayout } from 'features/SequencerSection/core/grid';
import { TracksLayout } from 'features/SequencerSection/core/tracks';
import { get } from 'features/SequencerSection/core';

interface Props {
  dimensions: Dimensions;
  position: Coordinates;
}
interface InjectedProps {
  gridSegmentWidth: number;
  getOffsetX: () => number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = get(GridLayout);
  const tracksLayout = get(TracksLayout);

  return {
    gridSegmentWidth: gridLayout.gridSegmentWidth,
    getOffsetX: () => tracksLayout.tracksScrolledX,
  };
});

@observer
export class Grid extends React.Component<Props & InjectedProps, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  render() {
    const { dimensions, gridSegmentWidth, getOffsetX, position } = this.props;

    return (
      <VerticalGrid
        colWidth={gridSegmentWidth}
        dimensions={dimensions}
        getOffsetX={getOffsetX}
        position={position}
      />
    );
  }
}

export default inject(Grid);
