import { Service } from 'typedi';
import { action, observable } from 'mobx';
import { json } from 'core/serialization/json';

import { Snip, SnipParams } from 'core/models/snip';

@Service()
export class SnipStore {
  // The main store for snips (by id)
  @json
  @observable
  readonly snips = observable.map<string, Snip>({});

  // Actions
  @action
  create = (params: SnipParams) => {
    const snip = new Snip(params);
    this.snips.set(snip.id, snip);
    return snip;
  };

  @action
  delete = (snip: Snip) => {
    this.snips.delete(snip.id);
  };

  @action
  deleteSnips = (snips: Snip[]) => {
    snips.forEach(snip => {
      this.snips.delete(snip.id);
    });
  };

  @observable
  getSnip = (id: string) => {
    return this.snips.get(id);
  };

  @observable
  getSnips = () => {
    return Array.from(this.snips.values());
  };
}

export { SnipParams };
