import { action, observable } from 'mobx'

export class MinimapInteraction {
  @observable isDragging: boolean = false

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging
  }
}

export const minimapInteraction = new MinimapInteraction()
