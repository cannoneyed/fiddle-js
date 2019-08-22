import { computed, observable } from 'mobx';
import { model, Model, prop } from 'mobx-keystone';
import { ModelProps } from 'mobx-keystone/dist/model/prop';
import { range } from 'lodash';
import { generateId } from 'utils/generate-id';

import { Dimensions } from 'core/interfaces';
import { Position } from 'core/primitives/position/simple';

import { Envelope } from 'core/state/tree/models/envelope';
import { InputPort, OutputPort } from './port';

import { IO_OFFSET, IO_PADDING } from 'features/GraphEditor/helpers/layout';

export type Data = Envelope | null;
export type Snip = { data: null };
export interface Operator {
  nInputs: number;
  nOutputs: number;
  operate: (data: Data[]) => Data;
}

function GraphNode(extendedProps: ModelProps) {
  abstract class _GraphNode extends Model(extendedProps) {
    abstract output: Data;

    nInputs = 0;
    nOutputs = 0;

    private inputMap = observable.map<number, _GraphNode>();
    private outputMap = observable.map<number, _GraphNode>();

    @computed
    get inputs(): (_GraphNode | null)[] {
      return [...this.inputMap.keys()].sort().map(key => {
        return this.inputMap.get(key) || null;
      });
    }

    @computed
    get outputs(): (_GraphNode | null)[] {
      return [...this.inputMap.keys()].sort().map(key => {
        return this.inputMap.get(key) || null;
      });
    }

    @computed
    get inputPorts(): InputPort[] {
      return range(this.nInputs).map(index => {
        const input = this.inputMap.get(index)!;
        const port = new InputPort({ node: this, index, from: input });
        const position = getInputPosition(this, index);
        port.position = position;
        return port;
      });
    }

    @computed
    get outputPorts(): OutputPort[] {
      return range(this.nOutputs).map(index => {
        const output = this.outputMap.get(index)!;
        const port = new OutputPort({ node: this, index, to: output });
        const position = getOutputPosition(index);
        port.position = position;
        return port;
      });
    }

    position: Position = { x: 0, y: 0 };
    @observable
    dimensions: Dimensions = {
      ...DEFAULT_NODE_DIMENSIONS,
    };

    setInput(other: _GraphNode, index: number) {
      this.inputMap.set(index, other);
    }

    removeInput(index: number) {
      this.inputMap.delete(index);
    }

    setOutput(other: _GraphNode, index: number) {
      this.outputMap.set(index, other);
    }

    removeOutput(index: number) {
      this.outputMap.delete(index);
    }
  }

  return _GraphNode;
}

@model('fiddle/core/Graph/EmptyNode')
export class EmptyNode extends GraphNode({
  id: prop<string>(() => generateId()),
}) {
  @computed
  get output() {
    return null;
  }
}

@model('fiddle/core/Graph/OutputNode')
export class OutputNode extends GraphNode({
  id: prop<string>(() => generateId()),
}) {
  nInputs = 1;
  nOutputs = 0;

  @computed
  get output() {
    const input = this.inputs[0];
    return input ? input.output : null;
  }
}

@model('fiddle/core/Graph/DataNode')
export class DataNode extends GraphNode({
  id: prop<string>(() => generateId()),
  data: prop<Data>(),
}) {
  nInputs = 0;
  nOutputs = 1;

  @computed
  get output() {
    return this.data;
  }
}

@model('fiddle/core/Graph/SnipNode')
export class SnipNode extends GraphNode({
  id: prop<string>(() => generateId()),
  snip: prop<Snip>(),
}) {
  nInputs = 0;
  nOutputs = 1;

  @computed
  get output() {
    return this.snip.data;
  }
}

@model('fiddle/core/Graph/OperatorNode')
export class OperatorNode extends GraphNode({
  id: prop<string>(() => generateId()),
  operator: prop<Operator>(),
}) {
  @computed
  get nInputs() {
    return this.operator.nInputs || 1;
  }

  @computed
  get nOutputs() {
    return this.operator.nOutputs || 1;
  }

  @computed
  get output() {
    const inputData = this.inputs.map(inputNode => (inputNode ? inputNode.output : null));
    return this.operator.operate(inputData);
  }
}

export type Node = EmptyNode | OutputNode | DataNode | SnipNode | OperatorNode;

export const DEFAULT_NODE_DIMENSIONS: Dimensions = {
  width: 100,
  height: 30,
};

// TODO: Get rid of these view properties in the tree model
export function getInputPosition(node: Node, index: number): Position {
  const offsetY = node.dimensions.height;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
}

export function getOutputPosition(index: number): Position {
  const offsetY = 0;
  const offsetX = IO_OFFSET * index + IO_PADDING;
  return { x: offsetX, y: offsetY };
}
