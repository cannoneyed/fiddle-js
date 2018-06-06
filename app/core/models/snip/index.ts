import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';
import { json } from 'core/serialization/json';

import { TimelineVector } from 'core/primitives/timeline-vector';

export interface SnipParams {
  length: TimelineVector;
  position: TimelineVector;
}

export class Snip {
  @json id: string;

  @json
  @observable
  length: TimelineVector;

  @json
  @observable
  position: TimelineVector;

  @observable isSelected = false;
  @observable isDragging = false;

  constructor(params: SnipParams) {
    const { position, length } = params;
    this.id = generateId();

    this.position = position;
    this.length = length || new TimelineVector(2);
  }

  @computed
  get end(): TimelineVector {
    return this.position.add(this.length);
  }

  @action
  setPosition(position: TimelineVector) {
    this.position = position;
  }

  static copy(clip: Snip) {
    return new Snip({
      length: clip.length,
      position: clip.position,
    });
  }
}
