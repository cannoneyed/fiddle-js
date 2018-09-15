import { action, computed, observable, IObservableArray, ObservableMap } from 'mobx';
import { generateId } from 'utils/generate-id';
import { Envelope } from 'core/models/envelope';
import { Operator } from 'core/models/operator';
import { Snip } from 'core/models/snip';
import { range } from 'lodash';

import { getInputPosition, getOutputPosition } from 'features/GraphEditor/helpers/layout';

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
    from.setOutput(to, outputIndex);
    to.setInput(from, inputIndex);
    this.connectionsMap.set(key, true);
  }

  @action
  disconnect(from: Node, to: Node, outputIndex = 0, inputIndex = 0) {
    const key = `${from.id}:${outputIndex}:${to.id}:${inputIndex}`;
    from.removeOutput(outputIndex);
    to.removeInput(inputIndex);
    this.connectionsMap.delete(key);
  }
}

export class Port {
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

export class Position {
  @observable
  x = 0;
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

  private inputMap = observable.map<number, Node>();
  private outputMap = observable.map<number, Node>();

  @computed
  get inputs(): (Node | null)[] {
    return [...this.inputMap.keys()].sort().map(key => {
      return this.inputMap.get(key) || null;
    });
  }

  @computed
  get outputs(): (Node | null)[] {
    return [...this.inputMap.keys()].sort().map(key => {
      return this.inputMap.get(key) || null;
    });
  }

  @computed
  get inputPorts(): InputPort[] {
    return range(this.nInputs).map(index => {
      const input = this.inputMap.get(index);
      const port = new InputPort(this, index, input);
      const position = getInputPosition(this, index);
      port.position.set(position);
      return port;
    });
  }

  @computed
  get outputPorts(): OutputPort[] {
    return range(this.nOutputs).map(index => {
      const output = this.outputMap.get(index);
      const port = new OutputPort(this, index, output);
      const position = getOutputPosition(index);
      port.position.set(position);
      return port;
    });
  }

  position = new Position();
  @observable
  dimensions: Dimensions = {
    ...DEFAULT_NODE_DIMENSIONS,
  };

  setInput(other: Node, index: number) {
    this.inputMap.set(index, other);
  }

  removeInput(index: number) {
    this.inputMap.delete(index);
  }

  setOutput(other: Node, index: number) {
    this.outputMap.set(index, other);
  }

  removeOutput(index: number) {
    this.outputMap.delete(index);
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

  @observable
  nInputs = 1;
  @observable
  nOutputs = 0;

  @computed
  get output() {
    return null;
  }
}

export class DataNode extends Node {
  @observable
  nInputs = 0;
  @observable
  nOutputs = 1;

  @computed
  get output() {
    return this.data;
  }

  @observable
  data: Data;
}

export class SnipNode extends Node {
  @observable
  nInputs = 0;
  @observable
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

  @computed
  get label() {
    return this.operator.label;
  }

  @computed
  get output() {
    const inputData = this.inputs.map(inputNode => (inputNode ? inputNode.output : null));
    return this.operator.operate(inputData);
  }

  @observable
  operator: Operator;

  constructor(operator: Operator) {
    super();
    this.operator = operator;
  }
}
