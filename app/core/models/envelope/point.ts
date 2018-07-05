import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { json } from 'core/serialization/json';

import { TimelineVector } from 'core/primitives/timeline-vector';

export class Point {
  @json id = generateId();
  @observable position: TimelineVector;

  @json
  @observable
  value: number;
}
