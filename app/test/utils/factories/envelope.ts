import { Envelope, Point } from 'core/models/envelope';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { range } from 'lodash';

export const makeSimpleFlatEnvelope = (length = new TimelineVector(2), value = 0.5) => {
  const envelope = new Envelope(length);
  const points = [new Point(envelope.start, value), new Point(envelope.end, value)];
  envelope.setPoints(points);
  return envelope;
};

export const makeSimpleRampDownEnvelope = (length = new TimelineVector(2), startValue = 1) => {
  const envelope = new Envelope(length);
  const points = [new Point(envelope.start, startValue), new Point(envelope.end, envelope.minimum)];
  envelope.setPoints(points);
  return envelope;
};

export const makeSimpleSawtoothEnvelope = (
  length = new TimelineVector(2),
  value = 1,
  period = new TimelineVector(1)
) => {
  const envelope = new Envelope(length);
  const points: Point[] = [];

  const nIterations = TimelineVector.getNPeriods(length, period);
  for (const n of range(nIterations)) {
    const startPosition = TimelineVector.fromAbsoluteTicks(period.absoluteTicks * n);
    const endPosition = TimelineVector.fromAbsoluteTicks(period.absoluteTicks * (n + 1));
    points.push(new Point(startPosition, value));
    points.push(new Point(endPosition, 0));
  }

  envelope.setPoints(points);
  return envelope;
};
