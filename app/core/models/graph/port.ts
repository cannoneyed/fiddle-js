import { observable } from 'mobx';

import { Position } from 'core/primitives/position';
import { Node } from 'core/models/graph/node';

export enum InteractionState {
  HOVER = 'HOVER',
  NONE = 'NONE',
}

export class Port {
  @observable
  interactionState = InteractionState.NONE;

  position = new Position();
  constructor(public node: Node, public index: number) {}
}

export class InputPort extends Port {
  constructor(node: Node, index: number, public from: Node | undefined) {
    super(node, index);
  }
}

export class OutputPort extends Port {
  constructor(node: Node, index: number, public to: Node | undefined) {
    super(node, index);
  }
}
