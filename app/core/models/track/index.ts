import { Container } from 'libs/typedi';
import { computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { generateId } from 'utils/generate-id';

import { ClipStore, DraggedClips } from 'core';

export class Track {
  static mobxLoggerConfig = filterMethods('setIsMouseOver');

  @observable
  id: string;
  @observable
  index: number;

  constructor() {
    this.id = generateId();
  }

  @computed
  get clips() {
    const clipStore = Container.get(ClipStore);
    return clipStore.getClips().filter(clip => clip.trackId === this.id);
  }

  @computed
  get draggedClips() {
    const draggedClipsStore = Container.get(DraggedClips);
    return draggedClipsStore.clips.filter(clip => clip.trackId === this.id);
  }
}
