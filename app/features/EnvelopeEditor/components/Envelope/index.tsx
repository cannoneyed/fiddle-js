import * as React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';

import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { ScreenVector } from 'core/primitives/screen-vector';

import Point from 'features/EnvelopeEditor/components/Point';
import Popover from 'features/EnvelopeEditor/components/Popover';
import Connection from 'features/EnvelopeEditor/components/Connection';

import { injectCore } from 'features/EnvelopeEditor/core';
import { ClickTarget } from 'features/EnvelopeEditor/core/interactions';

export interface Props {}
export interface InjectedProps {
  envelope: EnvelopeModel;
  getPointScreenVector: (point: PointModel) => ScreenVector;
  handleDoubleClick: (target: ClickTarget) => (event: React.MouseEvent) => void;
  handleMouseDown: (target: ClickTarget) => (event: React.MouseEvent) => void;
  setContainerElement: (element: SVGElement) => void;
  showPopover: boolean;
}

export interface State {
  isDragging: boolean;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  return {
    envelope: core.envelope,
    getPointScreenVector: core.interactions.getPointScreenVector,
    handleDoubleClick: core.interactions.handleDoubleClick,
    handleMouseDown: core.interactions.handleMouseDown,
    setContainerElement: core.interactions.setContainerElement,
    showPopover: core.interactions.showPopover,
  };
});

@observer
export class Envelope extends React.Component<Props & InjectedProps, State> {
  private svgRef = React.createRef<SVGElement>();

  componentDidMount() {
    this.props.setContainerElement(this.svgRef.current!);
  }

  render() {
    const { getPointScreenVector, handleDoubleClick, handleMouseDown, showPopover } = this.props;
    const { connections, points } = this.props.envelope;

    return (
      <EnvelopeWrapper>
        {showPopover && <Popover />}
        <Svg innerRef={this.svgRef} onDoubleClick={handleDoubleClick(null)}>
          {connections.map(connection => {
            return (
              <Connection
                key={connection.id}
                connection={connection}
                getScreenVector={getPointScreenVector}
                onDoubleClick={handleDoubleClick(connection)}
                onMouseDown={handleMouseDown(connection)}
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
                onMouseDown={handleMouseDown(point)}
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
