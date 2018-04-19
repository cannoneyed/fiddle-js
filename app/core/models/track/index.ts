import { Container } from 'typedi';
import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { ClipStore } from 'core/stores/clips';

export class Track {
  clipStore = Container.get(ClipStore);

  @observable id: string;
  @observable type = 'osc';

  constructor() {
    this.id = generateId();
  }

  @computed
  get clips() {
    return this.clipStore.getClips().filter(clip => clip.trackId === this.id);
  }
}
