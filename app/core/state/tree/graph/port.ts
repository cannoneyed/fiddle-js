import { observable } from 'mobx';
import { model, Model, prop } from 'mobx-keystone';
import { Node } from 'core/state/tree/graph/node';
import { Position } from 'core/primitives/position/simple';

export enum InteractionState {
  HOVER = 'HOVER',
  NONE = 'NONE',
}

@model('fiddle/core/Graph/InputPort')
export class InputPort extends Model({
  node: prop<Node>(),
  index: prop<number>(),
  from: prop<Node>(),
}) {
  @observable
  interactionState = InteractionState.NONE;

  @observable
  position: Position = { x: 0, y: 0 };
}

@model('fiddle/core/Graph/OutputPort')
export class OutputPort extends Model({
  node: prop<Node>(),
  index: prop<number>(),
  to: prop<Node>(),
}) {
  @observable
  interactionState = InteractionState.NONE;

  @observable
  position: Position = { x: 0, y: 0 };
}

export type Port = InputPort | OutputPort;
