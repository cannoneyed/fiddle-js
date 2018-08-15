import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Group, Line } from 'react-konva';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';

import { SequencerPositionService } from 'features/SequencerSection/core/services/sequencer-position';

import { TracksLayout } from 'features/SequencerSection/core/tracks';
import { Timeline } from 'features/SequencerSection/core/timeline';
import { get } from 'features/SequencerSection/core';

interface Props {}
interface InjectedProps {
  dimensions: Dimensions;
  offsetX: number;
  offsetY: number;
  visible: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const tracksLayout = get(TracksLayout);
  const timeline = get(Timeline);
  const sequencerPositionService = get(SequencerPositionService);
  const { dropTargetPosition, dropTargetTrackIndex } = timeline;
  const { trackHeight } = tracksLayout;

  const offsetX = dropTargetPosition ? sequencerPositionService.getOffsetX(dropTargetPosition) : 0;
  const offsetY = dropTargetTrackIndex !== null ? (dropTargetTrackIndex + 1) * trackHeight : 0;

  return {
    dimensions: tracksLayout.tracksViewportDimensions,
    offsetX,
    offsetY,
    visible: !!dropTargetPosition,
  };
});

@observer
export class DragToMarkers extends React.Component<{} & InjectedProps, {}> {
  getVerticalLinePoints() {
    const { dimensions, offsetX } = this.props;
    const { height } = dimensions;

    const start = { x: offsetX, y: 0 };
    const end = { x: offsetX, y: height };
    return makePoints([start, end]);
  }

  getHorizontalLinePoints() {
    const { dimensions, offsetY } = this.props;
    const { width } = dimensions;

    const start = { x: 0, y: offsetY };
    const end = { x: width, y: offsetY };
    return makePoints([start, end]);
  }

  getColor() {
    return theme.colors.lightGray.toRgbString();
  }

  render() {
    const { visible } = this.props;
    const verticalLinePoints = this.getVerticalLinePoints();
    const horizontalLinePoints = this.getHorizontalLinePoints();

    return visible ? (
      <Group>
        <Line points={horizontalLinePoints} stroke={this.getColor()} strokeWidth={1} />
        <Line points={verticalLinePoints} stroke={this.getColor()} strokeWidth={1} />
      </Group>
    ) : null;
  }
}

export default inject(DragToMarkers);
