import { computed, observable } from 'mobx';
import { Dimensions } from 'core/interfaces';
import { NotesEditorCore } from './index';
import { NotesEditorScroll } from './scroll';

export class NotesEditorLayout {
  scroll: NotesEditorScroll;

  constructor(core: NotesEditorCore) {
    this.scroll = new NotesEditorScroll(core, this);
  }

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };

  @observable rowHeight = 20;

  @observable pianoRollWidth = 20;

  @computed
  get pianoRollDimensions() {
    return {
      height: this.dimensions.height,
      width: this.pianoRollWidth,
    };
  }
}
