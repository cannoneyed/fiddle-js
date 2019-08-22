import { connectReduxDevTools, model, Model, registerRootStore, prop } from 'mobx-keystone';
import * as remotedev from 'remotedev';

import { Clips } from 'core/state/tree/stores/clips';
import { Tracks } from 'core/state/tree/stores/tracks';
import { makeDefaultData } from './defaultData';

@model('fiddle/core')
export class RootStore extends Model({
  clipsStore: prop<Clips>(),
  tracksStore: prop<Tracks>(),
}) {}

const { clipsStore, tracksStore } = makeDefaultData();
const rootStore = new RootStore({ clipsStore, tracksStore });

registerRootStore(rootStore);

const connection = (remotedev as any).connectViaExtension({
  name: 'fiddle',
});

connectReduxDevTools(remotedev, connection, rootStore);

export default rootStore;

export function getClipsStore() {
  return rootStore.clipsStore;
}

export function getTracksStore() {
  return rootStore.tracksStore;
}
