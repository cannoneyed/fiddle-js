import { Inject, Service } from 'libs/typedi';
import { clamp } from 'lodash';
import { action, computed, observable } from 'mobx';

import { makeDragHandler } from 'core/interactions/handlers/draggable';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';
import { TimelineVector } from 'core/primitives/timeline-vector';

import { EnvelopeEditorLayout, EnvelopeEditorState } from 'features/EnvelopeEditor/core';

export type ClickTarget = PointModel | ConnectionModel | null;

@Service()
export default class EnvelopeEditorInteractions {
  @observable
  isDragging = false;
  @observable
  draggingPoint: PointModel | null;

  @Inject(_ => EnvelopeEditorState)
  state: EnvelopeEditorState;
  @Inject(_ => EnvelopeEditorLayout)
  layout: EnvelopeEditorLayout;

  @computed
  get showPopover(): boolean {
    return this.isDragging && !!this.draggingPoint;
  }

  @observable
  private popoverScreenVector: ScreenVector = new ScreenVector();
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
    const { envelope } = this.state;
    const { envelopeDimensions, envelopePadding } = this.layout;
    const x =
      (position.absoluteTicks / envelope.length.absoluteTicks) * envelopeDimensions.width +
      envelopePadding.horizontal;
    const y = (1 - value) * envelopeDimensions.height + envelopePadding.vertical;
    return new ScreenVector(x, y);
  }

  getPointScreenVector = (point: PointModel) => {
    return this.getScreenVector(point.position, point.value);
  };

  getQuantizedPositionAndValue = (offsetX: number, offsetY: number) => {
    const { envelope, snapToGrid } = this.state;
    const { dimensions, gridSegmentWidth } = this.layout;
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

  @action
  handleDoubleClick = (target: ClickTarget) => (event: MouseEvent, position: ScreenVector) => {
    const { envelope } = this.state;
    const { x, y } = position;
    const quantized = this.getQuantizedPositionAndValue(x, y);

    if (target instanceof PointModel) {
      return envelope.removePoint(target);
    }

    envelope.createPoint(quantized.position, quantized.value);
  };
  handleMouseDown = (target: ClickTarget) => (event: MouseEvent, position: ScreenVector) => {
    if (target instanceof PointModel) {
      this.handlePointMouseDown(event, target, position);
    } else if (target instanceof ConnectionModel) {
      this.handleConnectionMouseDown(event, target);
    }
  };

  @action
  private handlePointMouseDown = (event: MouseEvent, point: PointModel, position: ScreenVector) => {
    const { envelope } = this.state;
    point.selected = true;

    const containerPageVector = new ScreenVector(
      event.pageX - position.x,
      event.pageY - position.y
    );

    const handleMouseMove = action((event: MouseEvent) => {
      const offsetX = event.pageX - containerPageVector.x;
      const offsetY = event.pageY - containerPageVector.y;

      const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);
      const quantizedScreenVector = this.getScreenVector(quantized.position, quantized.value);

      this.setIsDragging(true, point);
      const popoverScreenVector = containerPageVector.add(quantizedScreenVector);
      this.setPopoverScreenVector(popoverScreenVector);

      if (!point.position.equals(quantized.position)) {
        envelope.setPointPosition(point, quantized.position);
      }

      if (!(point.value === quantized.value)) {
        envelope.setPointValue(point, quantized.value);
      }
    });

    const handleMouseUp = action((event: MouseEvent) => {
      point.selected = false;
      this.setIsDragging(false);
    });

    const dragHandler = makeDragHandler(handleMouseMove, handleMouseUp);
    return dragHandler(event);
  };

  @action
  private handleConnectionMouseDown = (event: MouseEvent, connection: ConnectionModel) => {};
}
