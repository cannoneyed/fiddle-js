import { Inject, Service } from 'libs/typedi';
import { action } from 'mobx';

import { Snip, SnipParams } from 'core/models/snip';

import { SnipStore } from 'core';

@Service({ global: true })
export default class __SnipActions {
  @Inject(_ => SnipStore)
  private snipStore: SnipStore;

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
