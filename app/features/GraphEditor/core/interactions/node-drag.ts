import { Service } from 'libs/typedi';
import { action, observable } from 'mobx';

export const DRAG_DELAY: number = 200;

@Service()
export default class __NodeDragInteraction {
  @observable
  isDragging: false;

  @action
  setStartPosition(startX: number, startY: number) {}
}
