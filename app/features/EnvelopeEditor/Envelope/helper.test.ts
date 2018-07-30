import { Component, EnvelopeHelper } from './helper';
import { Props } from './index';

import { Envelope } from 'core/models/envelope';
import { Point as PointModel } from 'core/models/envelope/point';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';

import { Fraction } from 'core/primitives/fraction';
import { TimelineVector } from 'core/primitives/timeline-vector';

const ZERO = new TimelineVector(0);
const QUARTER = new TimelineVector(0, new Fraction(1, 4));

const makeDummyComponent = (p: Partial<Props> = {}): Component => {
  const envelope = p.envelope || new Envelope();
  const dimensions = p.dimensions || { width: 500, height: 100 };
  const snapToGrid = p.snapToGrid || new SnapToGrid();

  const gridSegmentWidth = SnapToGrid.getDivisionWidth(
    envelope.length,
    dimensions.width,
    snapToGrid
  );

  const props = { envelope, dimensions, snapToGrid, gridSegmentWidth };
  return { props };
};

describe('Envelope Helper', () => {
  it('constructs an envelope helper', () => {
    const component = makeDummyComponent();
    const helper = new EnvelopeHelper(component);
    expect(helper).toBeDefined();
  });

  it('gets point screen vectors', () => {
    const width = 500;
    const height = 100;
    const dimensions = { width, height };
    const component = makeDummyComponent({ dimensions });
    const helper = new EnvelopeHelper(component);

    let position = ZERO;
    let value = component.props.envelope.maximum;
    let point = new PointModel(position, value);
    let screenVector = helper.getPointScreenVector(point);
    expect(screenVector).toEqual({ x: 0, y: 0 });

    position = ZERO;
    value = component.props.envelope.minimum;
    point = new PointModel(position, value);
    screenVector = helper.getPointScreenVector(point);
    expect(screenVector).toEqual({ x: 0, y: height });

    position = component.props.envelope.length;
    value = component.props.envelope.maximum;
    point = new PointModel(position, value);
    screenVector = helper.getPointScreenVector(point);
    expect(screenVector).toEqual({ x: width, y: 0 });
  });

  describe('gets quantized positions', () => {
    it('restricts position between 0 and width', () => {
      const width = 500;
      const height = 100;
      const dimensions = { width, height };
      const snapToGrid = new SnapToGrid(snapToGridValues.snap_1_4);
      const component = makeDummyComponent({ dimensions, snapToGrid });
      const helper = new EnvelopeHelper(component);

      const offsetY = 0;
      let offsetX = -10;
      let position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(ZERO);

      offsetX = width + 10;
      position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(component.props.envelope.length);
    });

    it('handles quarter note snap to grid', () => {
      const width = 500;
      const height = 100;
      const dimensions = { width, height };
      const snapToGrid = new SnapToGrid(snapToGridValues.snap_1_4);
      const component = makeDummyComponent({ dimensions, snapToGrid });
      const helper = new EnvelopeHelper(component);

      const offsetY = 0;
      let offsetX = 0;
      let position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(ZERO);

      offsetX = 1;
      position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(ZERO);

      // Compute a point position at 1/4 note, then test the quantized values in between
      const pointPosition = QUARTER;
      const point = new PointModel(pointPosition, 0);
      const screenPosition = helper.getPointScreenVector(point);
      const midpoint = screenPosition.x / 2;

      offsetX = midpoint;
      position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(QUARTER);

      offsetX = midpoint + 1;
      position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(QUARTER);

      offsetX = midpoint - 1;
      position = helper.getQuantizedPositionAndValue(offsetX, offsetY).position;
      expect(position).toEqual(ZERO);
    });
  });
});
