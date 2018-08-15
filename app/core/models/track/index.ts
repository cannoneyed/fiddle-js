import { Container } from 'typedi';
import { computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { generateId } from 'utils/generate-id';

import { ClipStore } from 'core';

export class Track {
  static mobxLoggerConfig = filterMethods('setIsMouseOver');

  clipStore = Container.get(ClipStore);

  @observable
  id: string;
  @observable
  index: number;

  constructor() {
    this.id = generateId();
  }

  @computed
  get clips() {
    return this.clipStore.getClips().filter(clip => clip.trackId === this.id);
  }

  @computed
  get draggedClips() {
    return this.clipStore.getDraggedClips().filter(clip => clip.trackId === this.id);
  }
}
