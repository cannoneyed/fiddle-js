import { model, Model, registerRootStore, prop } from 'mobx-keystone';

import { Clips } from 'core/state/tree/clips';
import { Envelope, Point } from 'core/state/tree/envelope';
import { Graph } from 'core/state/tree/graph';
import { SnipNode } from 'core/state/tree/graph/node';
import { Tracks } from 'core/state/tree/tracks';
import { Track } from 'core/state/tree/track';
import { TimelineVector } from 'core/primitives/timeline-vector/simple';
import { Snip } from 'core/state/tree/snip';

@model('fiddle/core')
export class RootStore extends Model({
  clipsStore: prop<Clips>(),
  tracksStore: prop<Tracks>(),
}) {}

const track = new Track({});
const tracks = [track];
const tracksStore = new Tracks({ tracks });

const length = new TimelineVector(2);
const clipsStore = new Clips({});

const start = new TimelineVector(0);
const envelope = new Envelope({ length });
const a = new Point({ position: start, value: 0.75 });
const b = new Point({ position: length, value: 0.25 });
envelope.addPoint(a);
envelope.addPoint(b);

const snip = new Snip({ data: envelope, length });

const snipNode = new SnipNode({ snip });
const graph = new Graph({});
graph.addNode(snipNode);
graph.connect(
  snipNode,
  graph.mainOutputNode
);

clipsStore.createClip({
  trackId: track.id,
  position: new TimelineVector(2),
  length,
  graph,
});

const rootStore = new RootStore({ clipsStore, tracksStore });

registerRootStore(rootStore);

export default rootStore;

export function getClipsStore() {
  return rootStore.clipsStore;
}

export function getTracksStore() {
  return rootStore.tracksStore;
}
