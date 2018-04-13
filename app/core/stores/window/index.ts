import { action, observable } from 'mobx';

export class WindowStore {
  @observable width = window.innerWidth;
  @observable height = window.innerHeight;

  constructor() {
    window.onresize = this.onWindowResize;
  }

  @action.bound
  onWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };
}

export const windowStore = new WindowStore();
