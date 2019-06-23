import { Inject, Service } from 'libs/typedi';
import { action, observable } from 'mobx';

import { Coordinates } from 'core/interfaces';
import { Node as NodeModel } from 'core/models/graph/node';

import { GraphEditorLayout, SelectInteraction } from 'features/GraphEditor/core';

@Service()
export default class NodeDragInteraction {
  @Inject(type => GraphEditorLayout)
  layout: GraphEditorLayout;

  @Inject(type => SelectInteraction)
  selectInteraction: SelectInteraction;

  @observable
  isDragging = false;

  originalPositions = new Map<NodeModel, Coordinates>();
  @action
  handleNodeDrag = (node: NodeModel, deltaPosition: Coordinates) => {
    const nodes = this.selectInteraction.getSelectedNodes();
    if (!this.isDragging) {
      nodes.forEach(node => {
        const originalPosition = { ...node.position };
        this.originalPositions.set(node, originalPosition);
      });
      this.isDragging = true;
    }

    nodes.forEach(node => {
      const originalPosition = this.originalPositions.get(node)!;
      const position = {
        x: originalPosition.x + deltaPosition.x,
        y: originalPosition.y + deltaPosition.y,
      };
      this.layout.setNodePosition(node, position);
    });
  };

  @action
  endDrag = () => {
    this.isDragging = false;
  };
}
