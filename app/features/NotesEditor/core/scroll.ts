import { action, computed, observable } from 'mobx';
import { clamp } from 'lodash';
import { NotesEditorCore } from './index';
import { NotesEditorLayout } from './layout';

export class NotesEditorScroll {
  constructor(private core: NotesEditorCore, private layout: NotesEditorLayout) {}

  @observable private scrollX = 0;
  @observable private scrollY = 0;

  getScrollX = () => {
    return this.scrollX;
  };

  getScrollY = () => {
    return this.scrollX;
  };

  getScroll = () => {
    return {
      x: this.scrollX,
      y: this.scrollY,
    };
  };

  @computed
  get scrollableDimensions() {
    const { dimensions, rowHeight } = this.layout;
    return {
      height: rowHeight * this.core.keyLayout.nRows - dimensions.height,
      width: dimensions.width * 2 - dimensions.width,
    };
  }

  @action
  handleScroll(deltaX: number, deltaY: number) {
    const nextX = this.scrollX + deltaX;
    const nextY = this.scrollY + deltaY;
    this.scrollX = clamp(nextX, 0, this.scrollableDimensions.width);
    this.scrollY = clamp(nextY, 0, this.scrollableDimensions.height);
  }
}
