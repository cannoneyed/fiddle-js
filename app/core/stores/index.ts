import { Inject, Service } from 'typedi';

import { ClipStore } from './clips';
import { TrackStore } from './tracks';

@Service()
export class AppState {
  @Inject() clipStore: ClipStore;
  @Inject() trackStore: TrackStore;
}
