import { action, observable } from 'mobx';

export class MinimapDrag {
  @observable isDragging: boolean = false;

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }
}

export const minimapDrag = new MinimapDrag();
