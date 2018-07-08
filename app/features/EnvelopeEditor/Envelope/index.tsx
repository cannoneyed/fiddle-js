import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { Dimensions } from 'core/interfaces';

import Point from 'features/EnvelopeEditor/Point';

interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  computePointCoordinates(point: PointModel): { x: number; y: number } {
    const { dimensions, envelope } = this.props;
    const x = (point.position.bar / envelope.length.bar) * dimensions.width;
    const y = (1 - point.value) * dimensions.height;
    return { x, y };
  }

  render() {
    const { points } = this.props.envelope;

    return (
      <Svg>
        {points.map(point => {
          const { x, y } = this.computePointCoordinates(point);
          return <Point key={point.id} x={x} y={y} />;
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
