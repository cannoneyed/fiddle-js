import * as React from 'react';
import { observer } from 'mobx-react';
import { hot, injector } from 'utils/injector';
import { Group, Line, RegularPolygon } from 'react-konva';
import { makePoints } from 'utils/konva';
import theme from 'styles/theme';

import { Dimensions } from 'core/interfaces';
import { get, SequencerLayout, TracksLayout } from 'features/Sequencer/core';

interface Props {
  dimensions: Dimensions;
  timelineHeight: number;
}
interface InjectedProps {
  getPosition: () => number;
  getScrollX: () => number;
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerLayout = get(SequencerLayout);
  const tracksLayout = get(TracksLayout);

  return {
    getPosition: () => sequencerLayout.playheadPosition,
    getScrollX: () => tracksLayout.tracksScrolledX,
  };
});

@observer
export class Playhead extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { dimensions, getPosition, getScrollX, timelineHeight } = this.props;
    const position = getPosition();
    const scrollX = getScrollX();
    const start = {
      x: position,
      y: timelineHeight,
    };
    const end = {
      x: position,
      y: dimensions.height,
    };

    const points = makePoints([start, end]);

    return (
      <Group x={-scrollX}>
        <RegularPolygon
          x={position}
          y={timelineHeight - 5}
          sides={3}
          radius={7}
          rotation={180}
          fill={theme.colors.white.toRgbString()}
        />
        <Line points={points} strokeWidth={2} stroke={theme.colors.white.toRgbString()} />
      </Group>
    );
  }
}

export default inject(hot(module)(Playhead));
