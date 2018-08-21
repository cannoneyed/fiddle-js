import { Inject, Service } from 'libs/typedi';
import { action, computed, observable } from 'mobx';
import { clamp } from 'lodash';

import { NotesEditorState, NotesEditorLayout } from 'features/NotesEditor/core';

@Service()
export default class __NotesEditorScroll {
  @Inject(_ => NotesEditorLayout)
  layout: NotesEditorLayout;
  @Inject(_ => NotesEditorState)
  state: NotesEditorState;

  @observable
  private scrollX = 0;
  @observable
  private scrollY = 0;

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
      height: rowHeight * this.state.keyLayout.nRows - dimensions.height,
      width: dimensions.width * 2 - dimensions.width,
    };
  }

  @action
  handleScroll = (deltaX: number, deltaY: number) => {
    const nextX = this.scrollX + deltaX;
    const nextY = this.scrollY + deltaY;
    this.scrollX = clamp(nextX, 0, this.scrollableDimensions.width);
    this.scrollY = clamp(nextY, 0, this.scrollableDimensions.height);
  };
}
