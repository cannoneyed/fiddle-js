import { Service } from 'typedi';
import { action } from 'mobx';

import { Snip, SnipParams } from 'core/models/snip';

import { SnipStore } from 'core/state/stores/snips';

@Service({ global: true })
export class SnipActions {
  constructor(private snipStore: SnipStore) {}

  @action
  createSnip(params: SnipParams) {
    this.snipStore.createSnip(params);
  }

  @action
  deleteSnip(snip: Snip) {
    this.snipStore.deleteSnip(snip);
  }

  @action
  deleteSnips(snips: Snip[]) {
    this.snipStore.deleteSnips(snips);
  }
}
