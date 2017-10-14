import { action, observable } from 'mobx'

class WindowStore {
  @observable width = window.innerWidth
  @observable height = window.innerHeight

  constructor() {
    window.onresize = this.onWindowResize
  }

  @action.bound
  onWindowResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight
  }
}

export default new WindowStore()
export { WindowStore }
