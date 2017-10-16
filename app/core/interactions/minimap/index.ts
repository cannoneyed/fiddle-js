import { action, observable } from 'mobx'

class MinimapInteractions {
  @observable isDragging: boolean = false

  @action
  setIsDragging(isDragging: boolean) {
    this.isDragging = isDragging
  }
}

export default new MinimapInteractions()
export { MinimapInteractions }
