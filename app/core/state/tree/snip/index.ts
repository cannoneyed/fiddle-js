import { model, Model, prop } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';
import { TimelineVector } from 'core/primitives/timeline-vector/simple';

import { Data } from 'core/state/tree/graph';

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

@model('fiddle/core/Snip')
export class Snip extends Model({
  id: prop<string>(() => generateId()),
  length: prop<TimelineVector>(),
  data: prop<Data>(),
}) {}
