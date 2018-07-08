import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Point } from './point';
import { Connection } from './connection';
import { TimelineVector } from 'core/primitives/timeline-vector';

export class Envelope {
  id = generateId();

  @observable length: TimelineVector;

  @observable points = observable.array<Point>([]);
  @observable connections = observable.array<Connection>([]);

  @observable minimum: number = 0;
  @observable maximum: number = 1;

  constructor(length?: TimelineVector) {
    this.length = length || new TimelineVector(2);
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  removePoint(point: Point) {
    this.points.remove(point);
  }
}
