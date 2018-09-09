import { Envelope, Point } from 'core/models/envelope';
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

export const binaryOperate = (
  inputs: Envelope[],
  operation: (a: number, b: number) => number
): Envelope | null => {
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

    const entriesA = group.filter(entry => entry.envelope === inputA);
    const entriesB = group.filter(entry => entry.envelope === inputB);
    const position = group[0].point.position;

    if (groupType === PointGroupType.TWO_DIFFERENT) {
      const entryA = entriesA[0];
      const entryB = entriesB[0];
      const nextValue = entryA.point.value + entryB.point.value;
      const nextPoint = new Point(position, nextValue);
      nextPoints.push(nextPoint);
    } else if (groupType === PointGroupType.TWO_SAME) {
      const entryOne = group[0];
      const entryTwo = group[1];
      const otherEnvelope = getOther(entryOne.envelope);
      const otherValue = Envelope.getValueAtTicks(
        otherEnvelope,
        entryOne.point.position.absoluteTicks
      );
      nextPoints.push(new Point(position, entryOne.point.value + otherValue));
      nextPoints.push(new Point(position, entryTwo.point.value + otherValue));
    } else if (groupType === PointGroupType.THREE_DIFFERENT) {
      const singleEntry = entriesA.length === 1 ? entriesA[0] : entriesB[0];
      const pair = entriesA.length === 1 ? entriesB : entriesA;
      const sortedPair = pair.sort(entryByIndex);
      nextPoints.push(new Point(position, sortedPair[0].point.value + singleEntry.point.value));
      nextPoints.push(new Point(position, sortedPair[1].point.value + singleEntry.point.value));
    } else if (groupType === PointGroupType.FOUR_DIFFERENT) {
      const [firstA, secondA] = entriesA.sort(entryByIndex);
      const [firstB, secondB] = entriesB.sort(entryByIndex);

      nextPoints.push(new Point(firstA.point.position, firstA.point.value + firstB.point.value));
      nextPoints.push(new Point(secondA.point.position, secondA.point.value + secondB.point.value));
    }
  }

  output.setPoints(nextPoints);
  return output;
};
