import { Envelope, Point } from 'core/models/envelope';

export const binaryOperate = (
  inputs: Envelope[],
  op: (a: number, b: number) => number
): Envelope | null => {
  const [inputA, inputB] = inputs;
  if (!inputA) return null;
  if (!inputB) return inputA;

  const { larger, smaller } = arrangeByLength(inputA, inputB);

  const output = new Envelope(larger.length);
  output.maximum = larger.maximum * smaller.maximum;
  output.minimum = larger.minimum * smaller.minimum;

  const ticksWithPoints = getTicksWithPoints(inputA, inputB);
  const nextPoints: Point[] = [];

  for (const ticks of ticksWithPoints) {
    const pointsA = Envelope.getPointsAtTicks(inputA, ticks);
    const pointsB = Envelope.getPointsAtTicks(inputB, ticks);
    const pointsType = getPointsType(pointsA, pointsB);

    const position = pointsA.length ? pointsA[0].position : pointsB[0].position;

    if (pointsType === PointsType.TWO_DIFFERENT) {
      const pointA = pointsA[0];
      const pointB = pointsB[0];
      nextPoints.push(new Point(position, op(pointA.value, pointB.value)));
    } else if (pointsType === PointsType.TWO_SAME) {
      const pointsGroup = pointsA.length ? pointsA : pointsB;
      const otherEnvelope = pointsA.length ? inputB : inputA;
      const pointOne = pointsGroup[0];
      const pointTwo = pointsGroup[1];
      const otherValue = Envelope.getValueAtTicks(otherEnvelope, position.absoluteTicks);
      nextPoints.push(new Point(position, op(pointOne.value, otherValue)));
      nextPoints.push(new Point(position, op(pointTwo.value, otherValue)));
    } else if (pointsType === PointsType.THREE_DIFFERENT) {
      const singlePoint = pointsA.length === 1 ? pointsA[0] : pointsB[0];
      const pair = pointsA.length === 1 ? pointsB : pointsA;
      nextPoints.push(new Point(position, op(pair[0].value, singlePoint.value)));
      nextPoints.push(new Point(position, op(pair[1].value, singlePoint.value)));
    } else if (pointsType === PointsType.FOUR_DIFFERENT) {
      nextPoints.push(new Point(pointsA[0].position, op(pointsA[0].value, pointsB[0].value)));
      nextPoints.push(new Point(pointsA[1].position, op(pointsA[1].value, pointsB[1].value)));
    }
  }

  output.setPoints(nextPoints);
  return output;
};

function arrangeByLength(inputA: Envelope, inputB: Envelope) {
  const larger = inputA.length.gte(inputB.length) ? inputA : inputB;
  const smaller = larger === inputB ? inputA : inputB;
  return { larger, smaller };
}

function getTicksWithPoints(a: Envelope, b: Envelope) {
  const ticks = new Set<number>();
  processEnvelopeTicks(a, ticks);
  processEnvelopeTicks(b, ticks);
  return [...ticks.values()].sort();
}

function processEnvelopeTicks(envelope: Envelope, ticks: Set<number>) {
  for (const point of envelope.points) {
    ticks.add(point.position.absoluteTicks);
  }
}

const enum PointsType {
  ONE = 'ONE',
  TWO_DIFFERENT = 'TWO_DIFFERENT',
  TWO_SAME = 'TWO_SAME',
  THREE_DIFFERENT = 'THREE_DIFFERENT',
  FOUR_DIFFERENT = 'FOUR_DIFFERENT',
}
function getPointsType(a: Point[], b: Point[]): PointsType {
  if (a.length === 1 && b.length === 1) {
    return PointsType.TWO_DIFFERENT;
  } else if (a.length + b.length === 2) {
    return PointsType.TWO_SAME;
  } else if (a.length + b.length === 3) {
    return PointsType.THREE_DIFFERENT;
  } else if (a.length + b.length === 4) {
    return PointsType.FOUR_DIFFERENT;
  }
  return PointsType.ONE;
}
