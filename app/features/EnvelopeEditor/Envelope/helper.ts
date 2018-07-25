import { clamp } from 'lodash';

import { makeDragHandler } from 'core/interactions/handlers/draggable';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { Envelope } from './index';

export type ClickTarget = PointModel | ConnectionModel | null;

export class EnvelopeHelper {
  constructor(public component: Envelope) {}

  getPointScreenVector = (point: PointModel) => {
    const { dimensions, envelope } = this.component.props;
    const x = (point.position.absoluteTicks / envelope.length.absoluteTicks) * dimensions.width;
    const y = (1 - point.value) * dimensions.height;
    return new ScreenVector(x, y);
  };

  getQuantizedPositionAndValue = (offsetX: number, offsetY: number) => {
    const { dimensions, envelope, gridSegmentWidth, snapToGrid } = this.component.props;
    const { height, width } = dimensions;

    const x = clamp(offsetX, 0, width);
    const nearestGridIndex = Math.round(x / gridSegmentWidth);
    const nearestBeats = snapToGrid.division.multiply(nearestGridIndex);
    const position = new TimelineVector(0, nearestBeats);

    const y = clamp(offsetY, 0, height);
    const range = envelope.maximum - envelope.minimum;
    const free = envelope.stepSize === 0;
    const steps = free ? Infinity : range / envelope.stepSize;
    const stepHeight = free ? 1 : height / steps;
    const nearestY = Math.round(y / stepHeight);
    const value = ((height - nearestY) / height) * range + envelope.minimum;

    return { position, value };
  };

  handleDoubleClick = (target: ClickTarget) => (event: React.MouseEvent) => {
    event.stopPropagation();
    const { envelope } = this.component.props;
    const { offsetX, offsetY } = event.nativeEvent;
    const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);

    if (target instanceof PointModel) {
      return envelope.removePoint(target);
    }

    envelope.createPoint(quantized.position, quantized.value);
  };

  handlePointMouseDown = (point: PointModel) => (event: React.MouseEvent) => {
    const { envelope } = this.component.props;
    point.selected = true;

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);

      if (!point.position.isEqualTo(quantized.position)) {
        envelope.setPointPosition(point, quantized.position);
      }

      if (!(point.value === quantized.value)) {
        envelope.setPointValue(point, quantized.value);
      }
    };

    const handleMouseUp = () => {
      point.selected = false;
    };

    const dragHandler = makeDragHandler(handleMouseMove, handleMouseUp);
    return dragHandler(event);
  };

  handleConnectionMouseDown = (connection: ConnectionModel) => (event: React.MouseEvent) => {};
}
