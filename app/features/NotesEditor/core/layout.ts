import { computed, observable } from 'mobx';
import { Dimensions } from 'core/interfaces';
// import { NotesEditorContext } from './index';

export class NotesEditorLayout {
  // constructor(context: NotesEditorContext) {}

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };

  @observable rowHeight = 20;

  @observable scrollX = 0;
  @observable scrollY = 0;

  @observable pianoRollWidth = 20;

  @computed
  get pianoRollDimensions() {
    return {
      height: this.dimensions.height,
      width: this.pianoRollWidth,
    };
  }
}
