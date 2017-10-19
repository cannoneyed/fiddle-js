import { action, observable } from 'mobx'

import ZoomLevel from 'core/models/zoom-level'

class ZoomStore {
  @observable
  horizontal = new ZoomLevel({
    min: 0.15,
  })
  @observable
  vertical = new ZoomLevel({
    min: 0.15,
  })

  // Actions
  @action.bound
  zoomInHorizontal = () => {
    this.horizontal.zoomIn()
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.horizontal.zoomOut()
  }
}

export default new ZoomStore()
export { ZoomStore }
