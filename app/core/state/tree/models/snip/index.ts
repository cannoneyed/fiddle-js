import { model, Model, prop } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';
import { TimelineVector } from 'core/state/tree/primitives/timeline-vector';

import { Data } from 'core/state/tree/models/graph';

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
