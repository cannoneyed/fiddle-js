import { Service } from 'libs/typedi';
import { action, observable } from 'mobx';

import { Node as NodeModel } from 'core/models/graph/node';

@Service()
export default class __SelectInteractions {
  private selectedNodes = observable.map<NodeModel, boolean>();

  @action
  selectNode = (node: NodeModel, multiple = false) => {
    const isSelected = this.isNodeSelected(node);
    if (!multiple && !isSelected) {
      this.deselectAllNodes();
    }
    this.selectedNodes.set(node, true);
  };

  @action
  deselectNode = (node: NodeModel) => {
    this.selectedNodes.delete(node);
  };

  @action
  deselectAllNodes = () => {
    this.selectedNodes.clear();
  };

  isNodeSelected = (node: NodeModel): boolean => {
    return this.selectedNodes.has(node);
  };

  getSelectedNodes() {
    return [...this.selectedNodes.keys()];
  }
}
