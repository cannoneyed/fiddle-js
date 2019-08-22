import { computed, observable, ObservableMap } from 'mobx';
import { model, modelAction, Model, prop } from 'mobx-keystone';
import { generateId } from 'utils/generate-id';
import { Node, OutputNode } from 'core/state/tree/models/graph/node';
import { Envelope } from 'core/state/tree/models/envelope';
import { removeFromArray } from 'utils/remove-from-array';

export type Data = Envelope | null;

export interface Link {
  node: Node;
  index: number;
}
export interface Connection {
  from: Link;
  to: Link;
}

@model('fiddle/core/Graph')
export class Graph extends Model({
  id: prop<string>(() => generateId()),
  outputs: prop<OutputNode[]>(() => []),
}) {
  onInit() {
    this.addOutput(new OutputNode({}));
  }

  private nodesById: ObservableMap<string, Node> = observable.map({});
  private connectionsMap: ObservableMap<string, boolean> = observable.map({});

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
  get mainOutputNode() {
    return this.outputs[0];
  }

  @computed
  get mainOutputData(): Data {
    const output = this.outputs[0];
    return output ? output.output : null;
  }

  @modelAction
  addNode(node: Node) {
    this.nodesById.set(node.id, node);
  }

  @modelAction
  addOutput(output: OutputNode) {
    this.nodesById.set(output.id, output);
    this.outputs.push(output);
  }

  @modelAction
  removeOutput(output: OutputNode) {
    this.nodesById.delete(output.id);
    this.outputs = removeFromArray(this.outputs, output);
  }

  @modelAction
  removeNode(node: Node) {
    this.nodesById.delete(node.id);
  }

  @modelAction
  connect(from: Node, to: Node, outputIndex = 0, inputIndex = 0) {
    const key = `${from.id}:${outputIndex}:${to.id}:${inputIndex}`;
    from.setOutput(to, outputIndex);
    to.setInput(from, inputIndex);
    this.connectionsMap.set(key, true);
  }

  @modelAction
  disconnect(from: Node, to: Node, outputIndex = 0, inputIndex = 0) {
    const key = `${from.id}:${outputIndex}:${to.id}:${inputIndex}`;
    from.removeOutput(outputIndex);
    to.removeInput(inputIndex);
    this.connectionsMap.delete(key);
  }
}
