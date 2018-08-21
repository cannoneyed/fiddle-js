import { Container, ObjectType } from 'libs/typedi';

import { default as EnvelopeEditorState } from './state';
export { default as EnvelopeEditorState } from './state';
export { default as EnvelopeEditorInteractions } from './interactions';
export { default as EnvelopeEditorLayout } from './layout';

import { Envelope } from 'core/models/envelope';

export function get<T>(envelope: Envelope, type: ObjectType<T>): T {
  return Container.of(envelope).get(type);
}

export function getState(envelope: Envelope): EnvelopeEditorState {
  const state = Container.of(envelope).get(EnvelopeEditorState);
  state.envelope = envelope;
  return state;
}
