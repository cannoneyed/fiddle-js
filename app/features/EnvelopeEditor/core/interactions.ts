import { clamp } from 'lodash';
import { computed, observable } from 'mobx';

import { makeDragHandler } from 'core/interactions/handlers/draggable';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { EnvelopeEditorCore } from './index';

export type ClickTarget = PointModel | ConnectionModel | null;

export class EnvelopeEditorInteractions {
  @observable isDragging = false;
  @observable draggingPoint: PointModel | null;
  container: SVGElement;

  constructor(private core: EnvelopeEditorCore) {}

  @computed
  get showPopover(): boolean {
    return this.isDragging && !!this.draggingPoint;
  }

  @observable private popoverScreenVector: ScreenVector = new ScreenVector();
  getPopoverScreenVector = () => {
    return this.popoverScreenVector;
  };

  private setIsDragging(isDragging: boolean, point: PointModel | null = null) {
    if (this.isDragging !== isDragging) {
      this.isDragging = isDragging;
      this.draggingPoint = point;
    }
  }

  private setPopoverScreenVector(screenVector: ScreenVector) {
    this.popoverScreenVector = screenVector;
  }

  private getScreenVector(position: TimelineVector, value: number) {
    const { envelope, layout } = this.core;
    const { dimensions } = layout;
    const x = (position.absoluteTicks / envelope.length.absoluteTicks) * dimensions.width;
    const y = (1 - value) * dimensions.height;
    return new ScreenVector(x, y);
  }

  getPointScreenVector = (point: PointModel) => {
    return this.getScreenVector(point.position, point.value);
  };

  getQuantizedPositionAndValue = (offsetX: number, offsetY: number) => {
    const { envelope, layout, snapToGrid } = this.core;
    const { dimensions, gridSegmentWidth } = layout;
    const { height, width } = dimensions;

    const x = clamp(offsetX, 0, width);
    const nearestGridIndex = Math.round(x / gridSegmentWidth);

    const nearestBeats = snapToGrid.division.multiply(nearestGridIndex);
    const position = TimelineVector.fromFraction(nearestBeats);

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
    const { envelope } = this.core;
    const { offsetX, offsetY } = event.nativeEvent;
    const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);

    if (target instanceof PointModel) {
      return envelope.removePoint(target);
    }

    envelope.createPoint(quantized.position, quantized.value);
  };

  handleMouseDown = (target: ClickTarget) => (event: React.MouseEvent) => {
    if (target instanceof PointModel) {
      this.handlePointMouseDown(event, target);
    } else if (target instanceof ConnectionModel) {
      this.handleConnectionMouseDown(event, target);
    }
  };

  setContainerElement = (container: SVGElement) => {
    this.container = container;
  };

  private handlePointMouseDown = (event: React.MouseEvent, point: PointModel) => {
    const { envelope } = this.core;
    point.selected = true;

    const containerRect = this.container.getBoundingClientRect();
    const containerScreenVector = new ScreenVector(containerRect.left, containerRect.top);

    const handleMouseMove = (event: MouseEvent) => {
      const { pageX, pageY } = event;
      const offsetX = pageX - containerScreenVector.x;
      const offsetY = pageY - containerScreenVector.y;

      const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);
      const quantizedScreenVector = this.getScreenVector(quantized.position, quantized.value);

      this.setIsDragging(true, point);
      const popoverScreenVector = containerScreenVector.add(quantizedScreenVector);
      this.setPopoverScreenVector(popoverScreenVector);

      if (!point.position.equals(quantized.position)) {
        envelope.setPointPosition(point, quantized.position);
      }

      if (!(point.value === quantized.value)) {
        envelope.setPointValue(point, quantized.value);
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      point.selected = false;
      this.setIsDragging(false);
    };

    const dragHandler = makeDragHandler(handleMouseMove, handleMouseUp);
    return dragHandler(event);
  };

  private handleConnectionMouseDown = (event: React.MouseEvent, connection: ConnectionModel) => {};
}
