import { Inject, Service } from 'libs/typedi';
import { computed, observable } from 'mobx';
import { Dimensions } from 'core/interfaces';

import { NotesEditorScroll } from 'features/NotesEditor/core';

@Service()
export default class __NotesEditorLayout {
  @Inject(_ => NotesEditorScroll)
  scroll: NotesEditorScroll;

  @observable
  dimensions: Dimensions = {
    height: 500,
    width: 1000,
  };

  @observable
  rowHeight = 20;

  @observable
  pianoRollWidth = 20;

  @computed
  get pianoRollDimensions() {
    return {
      height: this.dimensions.height,
      width: this.pianoRollWidth,
    };
  }
}
