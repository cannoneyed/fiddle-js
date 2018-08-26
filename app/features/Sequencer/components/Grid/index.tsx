import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';

import { Coordinates, Dimensions } from 'core/interfaces';
import { VerticalGrid } from 'components/VerticalGrid';

import { get, TimelineState, TracksLayout } from 'features/Sequencer/core';

interface Props {
  dimensions: Dimensions;
  position: Coordinates;
}
interface InjectedProps {
  gridSegmentWidth: number;
  getOffsetX: () => number;
}

const inject = injector<Props, InjectedProps>(props => {
  const { timeline } = get(TimelineState);
  const tracksLayout = get(TracksLayout);

  return {
    gridSegmentWidth: timeline.segmentWidth,
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

export default inject(hot(module)(Grid));
