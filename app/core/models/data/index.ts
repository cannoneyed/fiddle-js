import { computed, observable, IObservableArray } from 'mobx';
import { Envelope } from 'core/models/envelope';
import { Snip } from 'core/models/snip';

export type Data = Envelope | null;

export abstract class Node {
  abstract output: Data;

  inputs: IObservableArray<Node> = observable([]);
  outputs: IObservableArray<Node> = observable([]);

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
  @computed
  get output() {
    return null;
  }
}

export class DataNode extends Node {
  @computed
  get output() {
    return this.data;
  }

  @observable
  data: Data;
}

export class SnipNode extends Node {
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
