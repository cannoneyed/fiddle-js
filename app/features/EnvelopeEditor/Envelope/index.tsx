import * as React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Point from 'features/EnvelopeEditor/Point';
import Popover from 'features/EnvelopeEditor/Popover';
import Connection from 'features/EnvelopeEditor/Connection';

import { EnvelopeHelper } from './helper';

export interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
  gridSegmentWidth: number;
  snapToGrid: SnapToGrid;
}

export interface State {
  isDragging: boolean;
}

@observer
export class Envelope extends React.Component<Props, State> {
  private helper: EnvelopeHelper;
  private svgRef = React.createRef<SVGElement>();

  constructor(props: Props) {
    super(props);
    this.helper = new EnvelopeHelper(this);
  }

  renderPopover = () => {
    return (
      <Popover
        screenVector={this.helper.getPopoverScreenVector()}
        point={this.helper.draggingPoint!}
      />
    );
  };

  handlePointMouseDown = (point: PointModel) => (event: React.MouseEvent) => {
    const container = this.svgRef.current!;
    this.helper.handlePointMouseDown(event, point, container);
  };

  makeConnectionMouseDownHandler = (connection: ConnectionModel) => (event: React.MouseEvent) => {
    const container = this.svgRef.current!;
    this.helper.handleConnectionMouseDown(event, connection, container);
  };

  render() {
    const { connections, points } = this.props.envelope;
    const { helper } = this;

    const shouldRenderPopover = helper.isDragging && helper.draggingPoint;

    return (
      <EnvelopeWrapper>
        {shouldRenderPopover && this.renderPopover()}
        <Svg innerRef={this.svgRef} onDoubleClick={helper.handleDoubleClick(null)}>
          {connections.map(connection => {
            return (
              <Connection
                key={connection.id}
                connection={connection}
                getScreenVector={helper.getPointScreenVector}
                onDoubleClick={helper.handleDoubleClick(connection)}
                onMouseDown={this.makeConnectionMouseDownHandler(connection)}
              />
            );
          })}
          {points.map(point => {
            return (
              <Point
                key={point.id}
                point={point}
                getScreenVector={helper.getPointScreenVector}
                onDoubleClick={helper.handleDoubleClick(point)}
                onMouseDown={this.handlePointMouseDown(point)}
              />
            );
          })}
        </Svg>
      </EnvelopeWrapper>
    );
  }
}

const full = css`
  width: 100%;
  height: 100%;
`;

const EnvelopeWrapper = styled.div`
  ${full};
`;

const Svg = styled.svg`
  ${full};
`;

export default Envelope;
