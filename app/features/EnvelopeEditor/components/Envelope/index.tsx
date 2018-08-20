import * as React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { ScreenVector } from 'core/primitives/screen-vector';

import Point from 'features/EnvelopeEditor/components/Point';
import Popover from 'features/EnvelopeEditor/components/Popover';
import Connection from 'features/EnvelopeEditor/components/Connection';

import { get, EnvelopeEditorInteractions } from 'features/EnvelopeEditor/core';
import { ClickTarget } from 'features/EnvelopeEditor/core/interactions';

export interface Props {
  envelope: EnvelopeModel;
}
export interface InjectedProps {
  getPointScreenVector: (point: PointModel) => ScreenVector;
  handleDoubleClick: (target: ClickTarget) => (event: React.MouseEvent) => void;
  handleMouseDown: (target: ClickTarget) => (event: React.MouseEvent) => void;
  setContainerElement: (element: SVGElement) => void;
  showPopover: boolean;
}

export interface State {
  isDragging: boolean;
}

const inject = injector<Props, InjectedProps>(props => {
  const interactions = get(props.envelope, EnvelopeEditorInteractions);
  return {
    getPointScreenVector: interactions.getPointScreenVector,
    handleDoubleClick: interactions.handleDoubleClick,
    handleMouseDown: interactions.handleMouseDown,
    setContainerElement: interactions.setContainerElement,
    showPopover: interactions.showPopover,
  };
});

@observer
export class Envelope extends React.Component<Props & InjectedProps, State> {
  private svgRef = React.createRef<SVGElement>();

  componentDidMount() {
    this.props.setContainerElement(this.svgRef.current!);
  }

  render() {
    const {
      envelope,
      getPointScreenVector,
      handleDoubleClick,
      handleMouseDown,
      showPopover,
    } = this.props;
    const { connections, points } = this.props.envelope;

    return (
      <EnvelopeWrapper>
        {showPopover && <Popover envelope={envelope} />}
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
