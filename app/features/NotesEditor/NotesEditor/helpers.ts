import { observable } from 'mobx';

export class ScrollManager {
  @observable scrollPercentX = 0;
  @observable scrollPercentY = 0;
}
