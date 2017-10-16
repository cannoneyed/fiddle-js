import { action, observable } from 'mobx'

class ZoomLevel {
  @observable horizontal: number
  @observable vertical: number

  zoomInterval = 0.1

  constructor(horizontal = 1, vertical = 1) {
    this.horizontal = horizontal
    this.vertical = vertical
  }

  @action
  zoomInHorizontal() {
    this.horizontal += this.zoomInterval
  }

  @action
  zoomOutHorizontal() {
    this.horizontal = Math.max(0, (this.horizontal -= this.zoomInterval))
  }
}

export default ZoomLevel
