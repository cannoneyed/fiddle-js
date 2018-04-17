import { action, observable } from 'mobx';

export class MinimapDragInteraction {
  @observable isDragging: boolean = false;

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }
}

export const minimapDragInteraction = new MinimapDragInteraction();
