import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Point from 'features/EnvelopeEditor/Point';
import Connection from 'features/EnvelopeEditor/Connection';

interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
  snapToGrid: SnapToGrid;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  computePointCoordinates(point: PointModel) {
    const { dimensions, envelope } = this.props;
    const x = (point.position.bar / envelope.length.bar) * dimensions.width;
    const y = (1 - point.value) * dimensions.height;
    return new ScreenVector(x, y);
  }

  handlePointMouseDown = (point: PointModel) => (event: React.MouseEvent) => {
    point.selected = true;
  };

  handleConnectionMouseDown = (connection: ConnectionModel) => (event: React.MouseEvent) => {
    console.log('mouse down', connection);
  };

  render() {
    const { connections, points } = this.props.envelope;

    return (
      <Svg>
        {connections.map(connection => {
          const startPosition = this.computePointCoordinates(connection.start);
          const endPosition = this.computePointCoordinates(connection.end);
          return (
            <Connection
              key={connection.id}
              startPosition={startPosition}
              endPosition={endPosition}
              onMouseDown={this.handleConnectionMouseDown(connection)}
            />
          );
        })}
        {points.map(point => {
          const position = this.computePointCoordinates(point);
          return (
            <Point
              key={point.id}
              position={position}
              selected={point.selected}
              onMouseDown={this.handlePointMouseDown(point)}
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
