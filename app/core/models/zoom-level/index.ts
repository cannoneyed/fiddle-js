import { action, observable } from 'mobx'
import { round } from 'lodash'

export interface IOptions {
  level?: number
  max?: number
  min?: number
  ratio?: number
}

export class ZoomLevel {
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
  zoomIn(ratio?: number) {
    const zoomRatio = ratio === undefined ? this.ratio : ratio
    this.level = round(Math.min(this.max, this.level * zoomRatio), 4)
  }

  @action
  zoomOut(ratio?: number) {
    const zoomRatio = ratio === undefined ? this.ratio : ratio
    this.level = round(Math.max(this.min, this.level / zoomRatio), 4)
  }
}
