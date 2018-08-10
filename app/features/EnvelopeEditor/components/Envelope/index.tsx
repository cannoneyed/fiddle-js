import * as React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { ScreenVector } from 'core/primitives/screen-vector';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Point from 'features/EnvelopeEditor/components/Point';
import Popover from 'features/EnvelopeEditor/components/Popover';
import Connection from 'features/EnvelopeEditor/components/Connection';

import { injectCore } from 'features/EnvelopeEditor/core';
import { ClickTarget } from 'features/EnvelopeEditor/core/interactions';

export interface Props {}
export interface InjectedProps {
  dimensions: Dimensions;
  draggingPoint: PointModel | null;
  envelope: EnvelopeModel;
  getPopoverScreenVector: () => ScreenVector;
  getPointScreenVector: (point: PointModel) => ScreenVector;
  gridSegmentWidth: number;
  handleConnectionMouseDown: (
    event: React.MouseEvent,
    connection: ConnectionModel,
    container: SVGElement
  ) => void;
  handleDoubleClick: (target: ClickTarget) => (event: React.MouseEvent) => void;
  handlePointMouseDown: (event: React.MouseEvent, point: PointModel, container: SVGElement) => void;
  isDragging: boolean;
  snapToGrid: SnapToGrid;
}

export interface State {
  isDragging: boolean;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  return {
    dimensions: core.layout.dimensions,
    draggingPoint: core.interactions.draggingPoint,
    envelope: core.envelope,
    getPopoverScreenVector: core.interactions.getPopoverScreenVector,
    getPointScreenVector: core.interactions.getPointScreenVector,
    gridSegmentWidth: core.layout.gridSegmentWidth,
    handleConnectionMouseDown: core.interactions.handleConnectionMouseDown,
    handleDoubleClick: core.interactions.handleDoubleClick,
    handlePointMouseDown: core.interactions.handlePointMouseDown,
    isDragging: core.interactions.isDragging,
    snapToGrid: core.snapToGrid,
  };
});

@observer
export class Envelope extends React.Component<Props & InjectedProps, State> {
  private svgRef = React.createRef<SVGElement>();

  renderPopover = () => {
    return (
      <Popover
        screenVector={this.props.getPopoverScreenVector()}
        point={this.props.draggingPoint!}
      />
    );
  };

  handlePointMouseDown = (point: PointModel) => (event: React.MouseEvent) => {
    const container = this.svgRef.current!;
    this.props.handlePointMouseDown(event, point, container);
  };

  makeConnectionMouseDownHandler = (connection: ConnectionModel) => (event: React.MouseEvent) => {
    const container = this.svgRef.current!;
    this.props.handleConnectionMouseDown(event, connection, container);
  };

  render() {
    const { draggingPoint, getPointScreenVector, handleDoubleClick, isDragging } = this.props;
    const { connections, points } = this.props.envelope;

    const shouldRenderPopover = isDragging && draggingPoint;

    return (
      <EnvelopeWrapper>
        {shouldRenderPopover && this.renderPopover()}
        <Svg innerRef={this.svgRef} onDoubleClick={handleDoubleClick(null)}>
          {connections.map(connection => {
            return (
              <Connection
                key={connection.id}
                connection={connection}
                getScreenVector={getPointScreenVector}
                onDoubleClick={handleDoubleClick(connection)}
                onMouseDown={this.makeConnectionMouseDownHandler(connection)}
              />
            );
          })}
          {points.map(point => {
            return (
              <Point
                key={point.id}
                point={point}
                getScreenVector={getPointScreenVector}
                onDoubleClick={handleDoubleClick(point)}
                onMouseDown={this.handlePointMouseDown(point)}
              />
            );
          })}
        </Svg>
      </EnvelopeWrapper>
    );
  }
}

export default inject(Envelope);

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
