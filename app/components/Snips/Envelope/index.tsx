import * as React from 'react';
import { observer } from 'mobx-react';
import { hot } from 'utils/injector';
import { Group, Line, Rect } from 'react-konva';
import { makePoints } from 'utils/konva';
import { clamp } from 'lodash';
import theme from 'styles/theme';

import { Coordinates, Dimensions } from 'core/interfaces';
import { Envelope, Point } from 'core/state/tree/envelope';

interface Props {
  backgroundColor: string;
  foregroundColor: string;
  dimensions: Dimensions;
  envelope: Envelope;
}
interface State {}

@observer
export class EnvelopeSnip extends React.Component<Props, State> {
  static defaultProps = {
    backgroundColor: theme.colors.mediumGray.toRgbString(),
    foregroundColor: theme.colors.lightGray.toRgbString(),
  };

  getRenderPosition(point: Point): Coordinates {
    const { dimensions, envelope } = this.props;
    const { position, value } = point;
    const { length, maximum } = envelope;

    const percentX = clamp(position.absoluteTicks / length.absoluteTicks, 0, 1);
    const percentY = 1 - clamp(value / maximum, 0, 1);
    return {
      x: percentX * dimensions.width,
      y: percentY * dimensions.height,
    };
  }

  render() {
    const { backgroundColor, dimensions, envelope, foregroundColor } = this.props;
    return (
      <Group {...dimensions}>
        <Rect {...dimensions} fill={backgroundColor} />
        {envelope.connections.map((connection, index) => {
          const start = this.getRenderPosition(connection.start);
          const end = this.getRenderPosition(connection.end);
          const points = makePoints([start, end]);
          return <Line key={index} points={points} strokeWidth={1} stroke={foregroundColor} />;
        })}
      </Group>
    );
  }
}

export default hot(module)(EnvelopeSnip);
