import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Point } from './point';
import { Connection, LineConnection } from './connection';
import { TimelineVector } from 'core/primitives/timeline-vector';

const BEGINNING = new TimelineVector(0);

export class Envelope {
  id = generateId();

  @observable length: TimelineVector;

  @observable points = observable.array<Point>([]);

  @observable minimum: number = 0;
  @observable maximum: number = 1;

  @observable stepSize = 0;

  constructor(length?: TimelineVector) {
    this.length = length || new TimelineVector(2);
  }

  private sortPoints() {
    this.points = this.points.sort((a: Point, b: Point) =>
      TimelineVector.sortAscendingFn(a.position, b.position)
    );
  }

  addPoint(point: Point, shouldSort = true) {
    this.points.push(point);
    shouldSort && this.sortPoints();
  }

  removePoint(point: Point, shouldSort = true) {
    this.points.remove(point);
    shouldSort && this.sortPoints();
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

  private clonePoint(point: Point) {
    return new Point(point.position.copy(), point.value);
  }

  private getPointsBeingDisplaced(point: Point, nextPosition: TimelineVector) {
    const pointIndex = this.points.indexOf(point);

    return this.points.filter((otherPoint, otherIndex) => {
      if (point === otherPoint) return false;
      const position = point.position;
      const otherPosition = otherPoint.position;

      const isBetween = TimelineVector.isBetween(otherPosition, position, nextPosition);
      if (isBetween) return true;

      // Handle points being overtaken
      const areOverlapping = otherPosition.isEqualTo(position);
      const movingLeft = nextPosition.isLessThan(position);
      const isOvertaking = movingLeft ? otherIndex < pointIndex : otherIndex > pointIndex;
      if (areOverlapping && isOvertaking) return true;

      // Handle points with exactly the same value
      const isNowOverlapping = otherPosition.isEqualTo(nextPosition);
      const overlappingValue = point.value === otherPoint.value;
      if (isNowOverlapping && overlappingValue) return true;

      // Handle moving to the start or end of the clip
      const movingToBeginning =
        otherPosition.isEqualTo(BEGINNING) && nextPosition.isEqualTo(BEGINNING);
      const movingToEnd =
        otherPosition.isEqualTo(this.length) && nextPosition.isEqualTo(this.length);
      if (movingToBeginning || movingToEnd) return true;

      return false;
    });
  }

  setPointPosition(point: Point, nextPosition: TimelineVector) {
    // Remove any overlapping points.
    const pointsToRemove = this.getPointsBeingDisplaced(point, nextPosition);
    pointsToRemove.forEach(point => this.removePoint(point, false));

    // Ensure that moving the point from the beginning or end of the envelope instantiates a new point at that position.
    if (point.position.isEqualTo(BEGINNING) && !nextPosition.isEqualTo(BEGINNING)) {
      const beginning = this.clonePoint(point);
      this.addPoint(beginning, false);
    } else if (point.position.isEqualTo(this.length) && !nextPosition.isEqualTo(this.length)) {
      const end = this.clonePoint(point);
      this.addPoint(end, false);
    }

    // Finally, set the position of the point.
    point.position = nextPosition;
    this.sortPoints();
  }

  setPointValue(point: Point, value: number) {
    point.value = value;
  }

  createPoint(position: TimelineVector, value: number) {
    const point = new Point(position, value);
    this.addPoint(point);
  }
}

export { Connection, LineConnection, Point };
