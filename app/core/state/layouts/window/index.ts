import { Service } from 'libs/typedi';
import { action, observable } from 'mobx';

@Service()
export default class WindowLayout {
  @observable
  width = window.innerWidth;

  @observable
  height = window.innerHeight;

  constructor() {
    window.onresize = this.onWindowResize;
  }

  @action.bound
  onWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };
}
