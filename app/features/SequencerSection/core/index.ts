import { Container, ObjectType } from 'typedi';

const token = Symbol('sequencer');

export function get<T>(type: ObjectType<T>): T {
  return Container.of(token).get(type);
}
