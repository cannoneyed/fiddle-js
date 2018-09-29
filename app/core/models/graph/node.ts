import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Operator } from 'core/models/operator';
import { range } from 'lodash';

import { Dimensions } from 'core/interfaces';
import { Envelope } from 'core/models/envelope';
import { InputPort, OutputPort } from 'core/models/graph/port';
import { Position } from 'core/primitives/position';
import { Snip } from 'core/models/snip';

import { getInputPosition, getOutputPosition } from 'features/GraphEditor/helpers/layout';

export type Data = Envelope | null;

export const DEFAULT_NODE_DIMENSIONS: Dimensions = {
  width: 100,
  height: 30,
};

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
    const input = this.inputs[0];
    return input ? input.output : null;
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
