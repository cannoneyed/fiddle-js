import { Fraction } from 'core/primitives/fraction';
import { TimeSignature } from 'core/primitives/time-signature';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { Timeline, DEFAULT_PRIMARY_WIDTH } from 'core/models/timeline';

const fraction = (n: number, d: number) => new Fraction(n, d);

describe('Timeline Model Class', () => {
  it('constructs a timeline with defaults', () => {
    const t = new Timeline();
    expect(t.length).toEqual(new TimelineVector(64));
    expect(t.timeSignature).toEqual(new TimeSignature(4, 4));
    expect(t.primaryWidth).toEqual(DEFAULT_PRIMARY_WIDTH);
  });

  it('computes barWidth as a multiple of primary divisions', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    expect(t.barWidth).toEqual(DEFAULT_PRIMARY_WIDTH * 4);
    t.timeSignature = new TimeSignature(3, 4);
    expect(t.barWidth).toEqual(DEFAULT_PRIMARY_WIDTH * 3);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 1X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    const segmentDivisions = [fraction(1, 1), fraction(1, 4), fraction(1, 2), fraction(1, 4)];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 2X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    t.primaryWidth = t.primaryWidth * 2;
    const segmentDivisions = [
      fraction(1, 1),
      fraction(1, 8),
      fraction(1, 4),
      fraction(1, 8),
      fraction(1, 2),
      fraction(1, 8),
      fraction(1, 4),
      fraction(1, 8),
    ];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 3X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    t.primaryWidth = t.primaryWidth * 3;
    const segmentDivisions = [
      fraction(1, 1),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 4),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 2),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 4),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
    ];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 4X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    t.primaryWidth = t.primaryWidth * 3;
    const segmentDivisions = [
      fraction(1, 1),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 4),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 2),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
      fraction(1, 4),
      fraction(1, 16),
      fraction(1, 8),
      fraction(1, 16),
    ];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 5X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    t.primaryWidth = t.primaryWidth * 5;
    const segmentDivisions = [
      fraction(1, 1),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 8),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 4),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 8),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 2),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 8),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 4),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
      fraction(1, 8),
      fraction(1, 32),
      fraction(1, 16),
      fraction(1, 32),
    ];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });

  it('gets segment divisions, for 4/4 time signatures, zoom 1/2X', () => {
    const t = new Timeline();
    t.timeSignature = new TimeSignature(4, 4);
    t.primaryWidth = t.primaryWidth / 2;
    const segmentDivisions = [fraction(1, 1), fraction(1, 2)];
    expect(t.segmentDivisions).toEqual(segmentDivisions);
  });
});
