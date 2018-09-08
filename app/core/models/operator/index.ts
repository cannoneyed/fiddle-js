import { Envelope, Point } from 'core/models/envelope';
import { Data } from 'core/models/graph';
import { SortedMap } from 'libs/sorted-map';

const arrangeByLength = (inputA: Envelope, inputB: Envelope) => {
  const larger = inputA.length.gte(inputB.length) ? inputA : inputB;
  const smaller = larger === inputB ? inputA : inputB;
  return { larger, smaller };
};

type PointByTick = { point: Point; ticks: number; envelope: Envelope };
const getPointsByTick = (inputA: Envelope, inputB: Envelope) => {
  const pointsByTick = new SortedMap<number, PointByTick[]>();

  const processEnvelope = (envelope: Envelope) => {
    for (const point of envelope.points) {
      const ticks = point.position.absoluteTicks;
      const group = pointsByTick.get(ticks, [])!;
      const pointByTick = { point, ticks, envelope };
      pointsByTick.set(ticks, [...group, pointByTick]);
    }
  };

  processEnvelope(inputA);
  processEnvelope(inputB);

  return pointsByTick;
};

const enum PointGroupType {
  ONE = 'ONE',
  TWO_DIFFERENT = 'TWO_DIFFERENT',
  TWO_SAME = 'TWO_SAME',
  THREE_DIFFERENT = 'THREE_DIFFERENT',
  FOUR_DIFFERENT = 'FOUR_DIFFERENT',
}
const getPointGroupType = (group: PointByTick[]): PointGroupType => {
  const [first, second] = group;
  if (group.length === 2) {
    if (first.envelope === second.envelope) {
      return PointGroupType.TWO_SAME;
    } else {
      return PointGroupType.TWO_DIFFERENT;
    }
  } else if (group.length === 3) {
    return PointGroupType.THREE_DIFFERENT;
  } else if (group.length === 4) {
    return PointGroupType.FOUR_DIFFERENT;
  }
  return PointGroupType.ONE;
};

export abstract class Operator {
  nInputs = 1;
  nOutputs = 1;

  protected inputTypes: Set<any>;
  label: string;

  abstract operate(inputs: Data[]): Data;
}

export class AddOperator extends Operator {
  nInputs = 2;
  inputTypes = new Set([Envelope]);
  label = 'add';

  operate(inputs: Envelope[]): Envelope | null {
    const [inputA, inputB] = inputs;
    if (!inputA) return null;
    if (!inputB) return inputA;

    const { larger, smaller } = arrangeByLength(inputA, inputB);
    const output = new Envelope(larger.length);
    output.maximum = larger.maximum * smaller.maximum;
    output.minimum = larger.minimum * smaller.minimum;

    const pointsByTick = getPointsByTick(inputA, inputB);
    const nextPoints: Point[] = [];

    for (const group of pointsByTick.values()) {
      const groupType = getPointGroupType(group);
      const entryA = group[0];
      const entryB = group[1];

      if (groupType === PointGroupType.TWO_DIFFERENT) {
        const nextValue = entryA.point.value + entryB.point.value;
        const nextPoint = new Point(entryA.point.position, nextValue);
        nextPoints.push(nextPoint);
      } else if (groupType === PointGroupType.TWO_SAME) {
      }
    }

    output.setPoints(nextPoints);
    return output;
  }
}

export class MultiplyOperator extends Operator {
  nInputs = 2;
  inputTypes = new Set([Envelope]);
  label = 'multiply';

  operate(inputs: Envelope[]): Envelope | null {
    const [inputA, inputB] = inputs;
    if (!inputA) return null;
    if (!inputB) return inputA;

    const { larger, smaller } = arrangeByLength(inputA, inputB);
    const output = new Envelope(larger.length);
    output.maximum = larger.maximum * smaller.maximum;
    output.minimum = larger.minimum * smaller.minimum;

    // const pointsByTick = getPointsByTick(inputA, inputB);

    return new Envelope();
  }
}
