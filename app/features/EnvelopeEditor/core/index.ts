import { Container, ObjectType } from 'typedi';

import { default as EnvelopeEditorState } from './state';
export { default as EnvelopeEditorState } from './state';
export { default as EnvelopeEditorInteractions } from './interactions';
export { default as EnvelopeEditorLayout } from './layout';

import { Envelope } from 'core/models/envelope';

export function get<T>(envelope: Envelope, type: ObjectType<T>): T {
  return Container.of(envelope).get(type);
}

export function instantiateState(
  envelope: Envelope,
  type: ObjectType<EnvelopeEditorState>
): EnvelopeEditorState {
  return Container.of(envelope).get(type, envelope);
}
