import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';

export class Note {
  id = generateId();

  @observable position: TimelineVector;
  @observable length: TimelineVector;

  @observable value: number;
  @observable velocity: number;
  @observable selected = false;

  constructor(position: TimelineVector, length: TimelineVector, value: number, velocity: number) {
    this.position = position;
    this.length = length;
    this.value = value;
    this.velocity = velocity;
  }
}
