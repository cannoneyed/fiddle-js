import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';

import Point from 'features/EnvelopeEditor/Point';
import Connection from 'features/EnvelopeEditor/Connection';

interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  computePointCoordinates(point: PointModel) {
    const { dimensions, envelope } = this.props;
    const x = (point.position.bar / envelope.length.bar) * dimensions.width;
    const y = (1 - point.value) * dimensions.height;
    return new ScreenVector(x, y);
  }

  render() {
    const { connections, points } = this.props.envelope;

    return (
      <Svg>
        {points.map(point => {
          const position = this.computePointCoordinates(point);
          return <Point key={point.id} position={position} />;
        })}
        {connections.map(connection => {
          const startPosition = this.computePointCoordinates(connection.start);
          const endPosition = this.computePointCoordinates(connection.end);
          return (
            <Connection
              key={connection.id}
              startPosition={startPosition}
              endPosition={endPosition}
            />
          );
        })}
      </Svg>
    );
  }
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export default Envelope;
