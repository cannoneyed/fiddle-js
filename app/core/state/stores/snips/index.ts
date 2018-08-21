import { Service } from 'libs/typedi';
import { observable } from 'mobx';

import { Snip, SnipParams } from 'core/models/snip';

@Service({ global: true })
export default class __SnipStore {
  // The main store for snips (by id)
  @observable
  readonly snips = observable.map<string, Snip>({});

  createSnip = (params: SnipParams) => {
    const snip = new Snip(params);
    this.snips.set(snip.id, snip);
    return snip;
  };

  deleteSnip = (snip: Snip) => {
    this.snips.delete(snip.id);
  };

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
