import { action, observable } from 'mobx'
import { round } from 'lodash'

export interface IOptions {
  level?: number
  max?: number
  min?: number
  ratio?: number
}

class ZoomLevel {
  @observable level: number
  max: number
  min: number
  ratio: number

  constructor(options: IOptions = {}) {
    const { level = 1, max = Infinity, min = 0, ratio = 1.1 } = options
    this.level = level
    this.max = max
    this.min = min
    this.ratio = ratio
  }

  @action
  zoomIn() {
    this.level = round(Math.min(this.max, this.level * this.ratio), 2)
  }

  @action
  zoomOut() {
    this.level = round(Math.max(this.min, this.level / this.ratio), 2)
  }
}

export default ZoomLevel
