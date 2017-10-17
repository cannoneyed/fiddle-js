import { action, observable } from 'mobx'

import ZoomLevel from 'core/models/zoom-level'

class ZoomStore {
  @observable level = new ZoomLevel()

  // Actions
  @action.bound
  zoomInHorizontal = () => {
    this.level.zoomInHorizontal()
  }

  @action.bound
  zoomOutHorizontal = () => {
    this.level.zoomOutHorizontal()
  }
}

export default new ZoomStore()
export { ZoomStore }
