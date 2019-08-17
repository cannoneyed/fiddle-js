import { types } from 'mobx-state-tree';
import { TimelineVector } from 'core/primitives/timeline-vector';

const TimelineVectorPrimitive = types.custom<string, TimelineVector>({
  name: 'TimelineVector',
  fromSnapshot(value: string) {
    return TimelineVector.fromJSON(value);
  },
  toSnapshot(value: TimelineVector) {
    return TimelineVector.toJSON(value);
  },
  isTargetType(value: string | TimelineVector): boolean {
    return value instanceof TimelineVector;
  },
  getValidationMessage(value: string): string {
    // TODO: Implement validation message here
    return '';
  },
});

const Clip = types.model({
  id: types.identifier,
  trackId: types.string,
  length: TimelineVectorPrimitive,
  position: TimelineVectorPrimitive,
});
