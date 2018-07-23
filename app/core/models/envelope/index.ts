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

  private getPointsWithin(a: TimelineVector, b: TimelineVector) {
    return this.points.filter(point => {
      const isBetween = TimelineVector.isBetweenInclusive(point.position, a, b);
      console.log(point.position.absoluteTicks, isBetween, a.absoluteTicks, b.absoluteTicks);
      return isBetween;
    });
  }

  setPointPosition(point: Point, position: TimelineVector) {
    // Remove any overlapping points.
    const pointsToRemove = this.getPointsWithin(point.position, position).filter(
      pointWithin => point != pointWithin
    );
    pointsToRemove.forEach(point => this.removePoint(point, false));

    // Ensure that moving the point from the beginning or end of the envelope instantiates a new point at that position.
    if (point.position.isEqualTo(BEGINNING) && !position.isEqualTo(BEGINNING)) {
      const beginning = this.clonePoint(point);
      this.addPoint(beginning, false);
    } else if (point.position.isEqualTo(this.length) && !position.isEqualTo(this.length)) {
      const end = this.clonePoint(point);
      this.addPoint(end, false);
    }

    // Finally, set the position of the point.
    point.position = position;
    this.sortPoints();
  }

  setPointValue(point: Point, value: number) {
    point.value = value;
  }
}

export { Connection, LineConnection, Point };
