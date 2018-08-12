import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Coordinates, Dimensions } from 'core/interfaces';
import { VerticalGrid } from 'components/VerticalGrid';

import { GridLayout } from 'core/state/layouts/sequencer/grid';
import { TracksLayout } from 'core/state/layouts/sequencer/tracks';

interface Props {
  dimensions: Dimensions;
  position: Coordinates;
}
interface InjectedProps {
  gridSegmentWidth: number;
  getOffsetX: () => number;
}

const inject = injector<Props, InjectedProps>(props => {
  const gridLayout = Container.get(GridLayout);
  const tracksLayout = Container.get(TracksLayout);

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
