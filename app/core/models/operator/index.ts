import { Envelope, Point } from 'core/models/envelope';
import { Data } from 'core/models/graph';
import { SortedMap } from 'libs/sorted-map';

type PointByTick = { point: Point; envelope: Envelope; index: number };

const arrangeByLength = (inputA: Envelope, inputB: Envelope) => {
  const larger = inputA.length.gte(inputB.length) ? inputA : inputB;
  const smaller = larger === inputB ? inputA : inputB;
  return { larger, smaller };
};

const entryByIndex = (a: PointByTick, b: PointByTick) => a.index - b.index;

const getPointsByTick = (inputA: Envelope, inputB: Envelope) => {
  const pointsByTick = new SortedMap<number, PointByTick[]>();

  const processEnvelope = (envelope: Envelope) => {
    for (const point of envelope.points) {
      const ticks = point.position.absoluteTicks;
      const group = pointsByTick.get(ticks, [])!;
      const pointByTick = { point, envelope, index: envelope.getIndex(point) };
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
    const getOther = (e: Envelope) => (e === inputA ? inputB : inputA);

    const output = new Envelope(larger.length);
    output.maximum = larger.maximum * smaller.maximum;
    output.minimum = larger.minimum * smaller.minimum;

    const pointsByTick = getPointsByTick(inputA, inputB);
    const nextPoints: Point[] = [];

    for (const group of pointsByTick.values()) {
      const groupType = getPointGroupType(group);

      if (groupType === PointGroupType.TWO_DIFFERENT) {
        const entryA = group.find(entry => entry.envelope === inputA)!;
        const entryB = group.find(entry => entry.envelope === inputB)!;
        const nextValue = entryA.point.value + entryB.point.value;
        const nextPoint = new Point(entryA.point.position, nextValue);
        nextPoints.push(nextPoint);
      } else if (groupType === PointGroupType.TWO_SAME) {
        const entryOne = group[0];
        const entryTwo = group[1];
        const otherEnvelope = getOther(entryOne.envelope);
        const otherValue = Envelope.getValueAtTicks(
          otherEnvelope,
          entryOne.point.position.absoluteTicks
        );
        nextPoints.push(new Point(entryOne.point.position, entryOne.point.value + otherValue));
        nextPoints.push(new Point(entryTwo.point.position, entryTwo.point.value + otherValue));
      } else if (groupType === PointGroupType.FOUR_DIFFERENT) {
        const [firstA, secondA] = group
          .filter(entry => entry.envelope === inputA)
          .sort(entryByIndex);
        const [firstB, secondB] = group
          .filter(entry => entry.envelope === inputB)
          .sort(entryByIndex);

        console.log({ firstA, secondA });
        console.log({ firstB, secondB });

        nextPoints.push(new Point(firstA.point.position, firstA.point.value + firstB.point.value));
        nextPoints.push(
          new Point(secondA.point.position, secondA.point.value + secondB.point.value)
        );
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
