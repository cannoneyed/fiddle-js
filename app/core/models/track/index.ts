import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { ClipStore } from 'core/stores/clips';

export class Track {
  clipStore = Container.get(ClipStore);

  @observable id: string;
  @observable type = 'osc';

  // View properties
  @observable isMouseOver = false;

  constructor() {
    this.id = generateId();
  }

  @computed
  get clips() {
    return this.clipStore.getClips().filter(clip => clip.trackId === this.id);
  }

  @action
  setIsMouseOver(isMouseOver: boolean) {
    this.isMouseOver = isMouseOver;
  }
}
