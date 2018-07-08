import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';

export class Point {
  id = generateId();
  @observable position: TimelineVector;

  @observable value: number;

  constructor(position: TimelineVector, value: number) {
    this.position = position;
    this.value = value;
  }
}
