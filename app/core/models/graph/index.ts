import { action, computed, observable, IObservableArray, ObservableMap } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Node, OutputNode } from 'core/models/graph/node';

export interface Link {
  node: Node;
  index: number;
}
export interface Connection {
  from: Link;
  to: Link;
}

export class Graph {
  id = generateId();
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
