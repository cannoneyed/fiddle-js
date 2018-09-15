import { action, computed, observable, IObservableArray, ObservableMap } from 'mobx';
import { generateId } from 'utils/generate-id';
import { Envelope } from 'core/models/envelope';
import { Operator } from 'core/models/operator';
import { Snip } from 'core/models/snip';

import { Coordinates, Dimensions } from 'core/interfaces';

export type Data = Envelope | null;

export interface Link {
  node: Node;
  index: number;
}
export interface Connection {
  from: Link;
  to: Link;
}

export const DEFAULT_NODE_DIMENSIONS: Dimensions = {
  width: 100,
  height: 30,
};

export class Graph {
  outputs: IObservableArray<OutputNode> = observable([]);

  private nodesById: ObservableMap<string, Node> = observable.map({});
  private connectionsMap: ObservableMap<string, boolean> = observable.map({});

  constructor() {
    this.addOutput(new OutputNode());
  }

  @computed
  get nodes(): Node[] {
    return [...this.nodesById.values()];
  }

  @computed
  get connections(): Connection[] {
    return [...this.connectionsMap.keys()].map(key => {
      const [fromId, outputIndex, toId, inputIndex] = key.split(':');
      const from = { node: this.nodesById.get(fromId)!, index: Number(outputIndex) };
      const to = { node: this.nodesById.get(toId)!, index: Number(inputIndex) };
      return { from, to };
    });
  }

  @computed
  get mainOutput() {
    return this.outputs[0];
  }

  @action
  addNode(node: Node) {
    this.nodesById.set(node.id, node);
  }

  @action
  addOutput(output: OutputNode) {
    this.nodesById.set(output.id, output);
    this.outputs.push(output);
  }

  @action
  removeOutput(output: OutputNode) {
    this.nodesById.delete(output.id);
    this.outputs.remove(output);
  }

  @action
  removeNode(node: Node) {
    this.nodesById.delete(node.id);
  }

  @action
  connect(from: Node, to: Node, outputIndex = 0, inputIndex = 0) {
    const key = `${from.id}:${outputIndex}:${to.id}:${inputIndex}`;
    this.connectionsMap.set(key, true);
  }

  @action
  disconnect(from: Node, to: Node, outputIndex = 0, inputIndex = 0) {
    const key = `${from.id}:${outputIndex}:${to.id}:${inputIndex}`;
    this.connectionsMap.delete(key);
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
  @observable
  dimensions: Dimensions = {
    ...DEFAULT_NODE_DIMENSIONS,
  };

  connectTo(other: Node) {
    this.outputs.push(other);
    other.inputs.push(this);
  }

  disconnectFrom(other: Node) {
    this.outputs.remove(other);
    other.inputs.remove(this);
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
    return this.operator.nInputs || 1;
  }

  get nOutputs() {
    return this.operator.nOutputs || 1;
  }

  get label() {
    return this.operator.label;
  }

  @computed
  get output() {
    const inputData = this.inputs.map(input => input.output);
    return this.operator.operate(inputData);
  }

  @observable
  operator: Operator;

  constructor(operator: Operator) {
    super();
    this.operator = operator;
  }
}
