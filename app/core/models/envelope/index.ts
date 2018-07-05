import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { json } from 'core/serialization/json';

import { Point } from './point';
import { Connection } from './connection';

export class Envelope {
  @json id = generateId();

  @json
  @observable
  points = observable.array<Point>([]);

  @json
  @observable
  connections = observable.array<Connection>([]);

  @json
  @observable
  minimum: number = 0;

  @json
  @observable
  maximum: number = 1;
}
