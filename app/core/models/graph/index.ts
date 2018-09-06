import { action, computed, observable, IObservableArray } from 'mobx';
import { generateId } from 'utils/generate-id';
import { Envelope } from 'core/models/envelope';
import { Operator } from 'core/models/operator';
import { Snip } from 'core/models/snip';

import { Coordinates } from 'core/interfaces';

export type Data = Envelope | null;
export type Connection = [Node, Node];

export class Graph {
  outputs: IObservableArray<OutputNode> = observable([new OutputNode()]);
  nodes: IObservableArray<Node> = observable([]);

  @computed
  get mainOutput() {
    return this.outputs[0];
  }

  @computed
  get connections() {
    const connections: Connection[] = [];
    this.nodes.forEach(node => {
      for (const output of node.outputs) {
        connections.push([node, output]);
      }
    });
    return connections;
  }

  @action
  addNode(node: Node) {
    this.nodes.push(node);
  }

  @action
  removeNode(node: Node) {
    this.nodes.remove(node);
  }

  @action
  connect(from: Node, to: Node) {
    from.connectTo(to);
  }
}

export class Position {
  @observable
  x = 50;
  @observable
  y = 0;

  @action
  set = (position: Coordinates) => {
    this.x = position.x;
    this.y = position.y;
  };
}

export abstract class Node {
  id = generateId();
  abstract output: Data;
  label: string;

  nInputs: number;
  nOutputs: number;

  inputs: IObservableArray<Node> = observable([]);
  outputs: IObservableArray<Node> = observable([]);

  position = new Position();

  isConnectedTo(node: Node) {
    return this.outputs.includes(node) && node.inputs.includes(this);
  }

  connectTo(node: Node) {
    if (!this.isConnectedTo(node)) {
      this.outputs.push(node);
      node.inputs.push(this);
    }
  }

  disconnectFrom(node: Node) {
    if (this.isConnectedTo(node)) {
      this.outputs.remove(node);
      node.inputs.remove(this);
    }
  }
}

export class EmptyNode extends Node {
  label = 'empty';

  @computed
  get output() {
    return null;
  }
}

export class OutputNode extends Node {
  label = 'output';

  nInputs = 1;
  nOutputs = 0;

  @computed
  get output() {
    return null;
  }
}

export class DataNode extends Node {
  nInputs = 0;
  nOutputs = 1;

  @computed
  get output() {
    return this.data;
  }

  @observable
  data: Data;
}

export class SnipNode extends Node {
  nInputs = 0;
  nOutputs = 1;

  get label() {
    return this.snip.data instanceof Envelope ? 'envelope' : 'snip';
  }

  @computed
  get output() {
    return this.snip.data;
  }

  @observable
  snip: Snip;

  constructor(snip: Snip) {
    super();
    this.snip = snip;
  }
}

export class OperatorNode extends Node {
  get nInputs() {
    return 1;
  }

  get nOutputs() {
    return 1;
  }

  get label() {
    return this.operator.label;
  }

  @computed
  get output() {
    return null;
  }

  @observable
  operator: Operator;

  constructor(operator: Operator) {
    super();
    this.operator = operator;
  }
}
