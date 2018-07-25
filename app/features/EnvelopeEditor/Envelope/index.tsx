import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Point from 'features/EnvelopeEditor/Point';
import Connection from 'features/EnvelopeEditor/Connection';

import { EnvelopeHelper } from './helper';

export interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
  gridSegmentWidth: number;
  snapToGrid: SnapToGrid;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  private helper: EnvelopeHelper;
  constructor(props: Props) {
    super(props);
    this.helper = new EnvelopeHelper(this);
  }

  render() {
    const { connections, points } = this.props.envelope;

    return (
      <Svg onDoubleClick={this.helper.handleDoubleClick(null)}>
        {connections.map(connection => {
          return (
            <Connection
              key={connection.id}
              connection={connection}
              getScreenVector={this.helper.getPointScreenVector}
              onDoubleClick={this.helper.handleDoubleClick(connection)}
              onMouseDown={this.helper.handleConnectionMouseDown(connection)}
            />
          );
        })}
        {points.map(point => {
          return (
            <Point
              key={point.id}
              point={point}
              getScreenVector={this.helper.getPointScreenVector}
              onDoubleClick={this.helper.handleDoubleClick(point)}
              onMouseDown={this.helper.handlePointMouseDown(point)}
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
