import { action, observable } from 'mobx';

import { Coordinates } from 'core/interfaces';

export class Position {
  @observable
  x = 0;
  @observable
  y = 0;

  @action
  set = (position: Coordinates) => {
    this.x = position.x;
    this.y = position.y;
  };
}
