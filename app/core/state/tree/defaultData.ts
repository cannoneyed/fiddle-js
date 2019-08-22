import { Clips } from 'core/state/tree/stores/clips';
import { Envelope, Point } from 'core/state/tree/models/envelope';
import { Graph } from 'core/state/tree/models/graph';
import { Snip } from 'core/state/tree/models/snip';
import { SnipNode } from 'core/state/tree/models/graph/node';
import { Track } from 'core/state/tree/models/track';
import { Tracks } from 'core/state/tree/stores/tracks';
import { TimelineVector } from 'core/state/tree/primitives/timeline-vector';

export function makeDefaultData() {
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

  return { tracksStore, clipsStore };
}
