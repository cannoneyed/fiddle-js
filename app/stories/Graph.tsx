import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { KonvaWrapper } from './helpers';

import { Graph, SnipNode } from 'core/models/graph';
import { Snip } from 'core/models/snip';
import { Envelope } from 'core/models/envelope';

import GraphEditor from 'features/GraphEditor/components/Graph';

const constructGraph = (): Graph => {
  const graph = new Graph();

  const envelope = new Envelope();
  const snip = new Snip({ data: envelope, length: envelope.length });
  const envelopeNode = new SnipNode(snip);

  graph.addNode(envelopeNode);
  envelopeNode.position.set({ x: envelopeNode.position.x, y: 50 });

  graph.connect(
    envelopeNode,
    graph.mainOutput
  );

  return graph;
};

const stories = storiesOf('Graph Editor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const height = 500;
  const width = 1000;

  const dimensions = { height, width };
  const graph = constructGraph();

  const props = {
    dimensions,
    graph,
  };

  return (
    <KonvaWrapper dimensions={dimensions}>
      <GraphEditor {...props} />
    </KonvaWrapper>
  );
});
