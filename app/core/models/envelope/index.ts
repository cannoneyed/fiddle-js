import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { filterMethods } from 'utils/log-filter';

import { Connection, LineConnection } from './connection';
import { Point } from './point';
import { PointsByTick } from './points-by-tick';

import { TimelineVector } from 'core/primitives/timeline-vector';

const BEGINNING = new TimelineVector(0);

export class Envelope {
  static mobxLoggerConfig = filterMethods('setPointValue', 'setPointPosition');
  id = generateId();

  @observable
  length: TimelineVector;

  private pointIndices = new Map<Point, number>();
  private pointsByTick = new PointsByTick();
  points = observable.array<Point>([]);

  @observable
  minimum: number = 0;
  @observable
  maximum: number = 1;

  @observable
  stepSize = 0;

  constructor(length = new TimelineVector(2), points: Point[] = []) {
    this.length = length;
    this.setPoints(points);
  }

  get start() {
    return new TimelineVector(0);
  }

  get end() {
    return this.length;
  }

  @computed
  get connections() {
    const connections = [];
    for (let i = 1; i < this.points.length; i++) {
      const previous = this.points[i - 1];
      const current = this.points[i];
      connections.push(new Connection(previous, current));
    }
    return connections;
  }

  @action
  setPoints(points: Point[]) {
    if (!isSorted(points)) {
      points = points.slice().sort(sortAscending);
    }
    for (const point of points) {
      this.addPointAtEnd(point);
    }
  }

  private addPointAtEnd(point: Point) {
    this.addPointAtIndex(point, this.points.length);
  }

  private addPointAtBeginning(point: Point) {
    this.addPointAtIndex(point, 0);
  }

  private addPointAtIndex(point: Point, index: number) {
    this.points.splice(index, 0, point);
    this.pointsByTick.add(point);
    this.updatePointIndices();
  }

  private updatePointIndices() {
    this.points.forEach((p, index) => {
      this.pointIndices.set(p, index);
    });
  }

  @action
  addPoint(point: Point) {
    this.addPointAtEnd(point);
  }

  @action
  removePoint(point: Point) {
    if (this.canRemovePoint(point)) {
      this.removePoint_(point);
    }
  }

  private removePoint_(point: Point) {
    this.points.remove(point);
    this.pointsByTick.remove(point);
    this.pointIndices.delete(point);
    this.updatePointIndices();
  }

  @action
  setPointPosition(point: Point, nextPosition: TimelineVector) {
    // Remove any overlapping points.
    // TODO: Make this non-permanent until the mouse is released.
    const pointsToRemove = this.getPointsBeingDisplaced(point, nextPosition);
    pointsToRemove.forEach(point => this.removePoint_(point));

    // Ensure that moving the point from the beginning or end of the envelope instantiates a new point at that position.
    if (this.isAtBeginning(point.position) && !this.isAtBeginning(nextPosition)) {
      this.addPointAtBeginning(this.clonePoint(point));
    } else if (this.isAtEnd(point.position) && !this.isAtEnd(nextPosition)) {
      this.addPointAtEnd(this.clonePoint(point));
    }

    // Finally, set the position of the point.
    point.position = nextPosition;
  }

  @action
  setPointValue(point: Point, value: number) {
    point.value = value;
  }

  @action
  createPoint(position: TimelineVector, value: number) {
    const othersAtPosition = this.points.filter(otherPoint => otherPoint.position.equals(position));
    if (othersAtPosition.length > 1) return;

    // Simply update the value of the points at the beginning or end.
    if (this.isAtBeginning(position)) {
      const beginning = this.getBeginningPoint();
      beginning && (beginning.value = value);
    } else if (this.isAtEnd(position)) {
      const end = this.getEndPoint();
      end && (end.value = value);
    }
    // Otherwise, create a new point, inserted at the correct index
    else {
      const insertionIndex =
        this.points.findIndex(point => point.position.absoluteTicks > position.absoluteTicks) || 1;
      const point = new Point(position, value);
      this.addPointAtIndex(point, insertionIndex);
    }
  }

  getIndex = (point: Point) => {
    const index = this.pointIndices.get(point);
    return index === undefined ? -1 : index;
  };

  private getBeginningPoint = () => this.points[0];
  private getEndPoint = () => this.points[this.points.length - 1];
  private isAtBeginning = (position: TimelineVector) => position.equals(BEGINNING);
  private isAtEnd = (position: TimelineVector) => position.equals(this.length);
  private isAtBeginningOrEnd = (position: TimelineVector) =>
    this.isAtBeginning(position) || this.isAtEnd(position);

  private canRemovePoint = (point: Point) => {
    const isBeginningOrEnd = this.isAtBeginningOrEnd(point.position);
    const otherPointsWithSamePosition = this.points.filter(
      otherPoint => otherPoint.position.equals(point.position) && point !== otherPoint
    );
    return isBeginningOrEnd ? otherPointsWithSamePosition.length > 0 : true;
  };

  private clonePoint(point: Point) {
    return new Point(point.position.copy(), point.value);
  }

  private getPointsBeingDisplaced(point: Point, nextPosition: TimelineVector) {
    const pointIndex = this.getIndex(point);

    const pointsToRemove = this.points.filter((otherPoint, otherIndex) => {
      if (point === otherPoint) return false;
      const position = point.position;
      const otherPosition = otherPoint.position;

      const isBetween = TimelineVector.isBetween(otherPosition, position, nextPosition);
      if (isBetween) return true;

      // Handle points being overtaken
      const areOverlapping = otherPosition.equals(position);
      const movingLeft = nextPosition.lt(position);
      const isOvertaking = movingLeft ? otherIndex < pointIndex : otherIndex > pointIndex;
      if (areOverlapping && isOvertaking) return true;

      // Handle points with exactly the same value
      const isNowOverlapping = otherPosition.equals(nextPosition);
      const overlappingValue = point.value === otherPoint.value;
      if (isNowOverlapping && overlappingValue) return true;

      // Handle moving to the start or end of the clip
      const movingToBeginning =
        this.isAtBeginning(otherPosition) && this.isAtBeginning(nextPosition);
      const movingToEnd = this.isAtEnd(otherPosition) && this.isAtEnd(nextPosition);

      if (movingToBeginning || movingToEnd) return true;
      return false;
    });

    // Additionally, when we move a point to the same position as more than another point, we need to
    // figure out which points to remove. We keep the lowest and highest index, but remove any in the middle.
    const indicesWithSamePosition = this.points
      .filter(otherPoint => otherPoint.position.equals(nextPosition) && point !== otherPoint)
      .map(this.getIndex)
      .concat([pointIndex])
      .sort();

    const getMiddleElements = <T>(x: T[]) => (x.length >= 3 ? x.slice(1, x.length - 1) : []);
    const morePointsToRemove = getMiddleElements(indicesWithSamePosition).map(
      index => this.points[index]
    );
    return [...pointsToRemove, ...morePointsToRemove];
  }

  static getValueAtTicks(e: Envelope, ticks: number) {
    const indexAfter = e.points.findIndex(point => {
      return point.position.absoluteTicks > ticks;
    });
    const pointBefore = e.points[indexAfter - 1];
    const pointAfter = e.points[indexAfter];
    const deltaValue = pointAfter.value - pointBefore.value;
    const ticksBetween = pointAfter.position.absoluteTicks - pointBefore.position.absoluteTicks;
    const deltaTicks = ticks - pointBefore.position.absoluteTicks;
    const percent = deltaTicks / ticksBetween;
    const value = deltaValue * percent + pointBefore.value;
    return value;
  }
}

const isSorted = (points: Point[]) => {
  if (points.length === 0) return true;
  const lastPosition = points[0].position;
  for (const point of points) {
    if (point.position.lte(lastPosition)) {
      return false;
    }
  }
  return true;
};

const sortAscending = (a: Point, b: Point) =>
  TimelineVector.sortAscendingFn(a.position, b.position);

export { Connection, LineConnection, Point };
