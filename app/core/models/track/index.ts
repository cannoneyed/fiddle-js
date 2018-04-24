import { Container } from 'typedi';
import { action, computed, observable } from 'mobx';
import { filterMethods } from 'utils/log-filter';
import { generateId } from 'utils/generate-id';

import { ClipStore } from 'core/stores/clips';

export class Track {
  static mobxLoggerConfig = filterMethods('setIsMouseOver');

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

  // @computed
  // get draggedClips() {
  //   return this.clipStore.getDraggedClips().filter({clip, trackId} => {
  //     if (trackId === this.index) {
  //       return clip
  //     }
  //   });
  // }

  @action
  setIsMouseOver(isMouseOver: boolean) {
    this.isMouseOver = isMouseOver;
  }
}
