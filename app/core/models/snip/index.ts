import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { TimelineVector } from 'core/primitives/timeline-vector';

import { Envelope } from 'core/models/envelope';

export interface SnipParams {
  length: TimelineVector;
  data?: SnipData;
}

export const enum SnipType {
  container = 'container',
  envelope = 'envelope',
  notes = 'notes',
  trigger = 'trigger',
}

export type SnipData = Envelope | null;

export class Snip {
  id = generateId();

  @observable
  length: TimelineVector;

  @observable
  data: SnipData = null;

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
