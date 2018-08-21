import * as React from 'react';
import { observer } from 'mobx-react';
import { Group, Rect } from 'react-konva';
import { injector } from 'utils/injector';
import { makeHandler } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { ScreenVector } from 'core/primitives/screen-vector';

import Point from 'features/EnvelopeEditor/components/Point';
import Popover from 'features/EnvelopeEditor/components/Popover';
import Connection from 'features/EnvelopeEditor/components/Connection';

import { get, EnvelopeEditorInteractions } from 'features/EnvelopeEditor/core';
import { ClickTarget } from 'features/EnvelopeEditor/core/interactions';

export interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
}
export interface InjectedProps {
  getPointScreenVector: (point: PointModel) => ScreenVector;
  handleDoubleClick: (target: ClickTarget) => (event: MouseEvent, position: ScreenVector) => void;
  handleMouseDown: (target: ClickTarget) => (event: MouseEvent, position: ScreenVector) => void;
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
    showPopover: interactions.showPopover,
  };
});

@observer
export class Envelope extends React.Component<Props & InjectedProps, State> {
  render() {
    const {
      dimensions,
      envelope,
      getPointScreenVector,
      handleDoubleClick,
      handleMouseDown,
      showPopover,
    } = this.props;
    const { connections, points } = this.props.envelope;

    const handleDoubleClickEnvelope = makeHandler((event: MouseEvent) => {
      const screenVector = new ScreenVector(event.offsetX, event.offsetY);
      handleDoubleClick(null)(event, screenVector);
    });

    return (
      <Group {...dimensions}>
        {showPopover && <Popover envelope={envelope} />}
        <Rect {...dimensions} onDblClick={handleDoubleClickEnvelope} />
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
      </Group>
    );
  }
}

export default inject(Envelope);
