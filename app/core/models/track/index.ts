import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { generateId } from 'utils/generate-id';

import { ClipStore } from 'core/state/stores/clips';

export class Track {
  static mobxLoggerConfig = filterMethods('setIsMouseOver');

  clipStore = Container.get(ClipStore);

  @observable id: string;
  @observable index: number;
  @observable type = 'osc';

  // View properties
  @observable isMouseOver = false;

  constructor() {
    this.id = generateId();
  }

  @computed
  get clips() {
    return this.clipStore.getClips().filter(clip => clip.track === this);
  }

  @computed
  get draggedClips() {
    return this.clipStore.getDraggedClips().filter(clip => clip.track === this);
  }

  @action
  setIsMouseOver(isMouseOver: boolean) {
    this.isMouseOver = isMouseOver;
  }
}
