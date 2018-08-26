import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';
import { Data } from 'core/models/data';

export interface SnipParams {
  length: TimelineVector;
  data?: Data;
}

export const enum SnipType {
  container = 'container',
  envelope = 'envelope',
  notes = 'notes',
  trigger = 'trigger',
}

export class Snip {
  id = generateId();

  @observable
  length: TimelineVector;

  @observable
  data: Data = null;

  constructor(params: SnipParams) {
    const { data = null, length } = params;
    this.length = length || new TimelineVector(2);
    this.data = data;
  }

  end(position: TimelineVector): TimelineVector {
    return position.add(this.length);
  }

  static copy(clip: Snip) {
    return new Snip({
      length: clip.length,
    });
  }
}
