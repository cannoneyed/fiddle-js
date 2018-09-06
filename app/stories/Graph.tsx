import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { KonvaWrapper } from './helpers';

import { Graph, OperatorNode, SnipNode } from 'core/models/graph';
import { MultiplyOperator } from 'core/models/operator';
import { Snip } from 'core/models/snip';
import { Envelope } from 'core/models/envelope';

import GraphEditor from 'features/GraphEditor/components/Graph';

const constructGraph = (): Graph => {
  const graph = new Graph();

  const envelopeA = new Envelope();
  const snipA = new Snip({ data: envelopeA, length: envelopeA.length });
  const envelopeNodeA = new SnipNode(snipA);

  graph.addNode(envelopeNodeA);
  envelopeNodeA.position.set({ x: envelopeNodeA.position.x, y: 100 });

  const envelopeB = new Envelope();
  const snipB = new Snip({ data: envelopeB, length: envelopeB.length });
  const envelopeNodeB = new SnipNode(snipB);

  graph.addNode(envelopeNodeB);
  envelopeNodeB.position.set({ x: envelopeNodeB.position.x, y: 150 });

  const multiplyOperator = new MultiplyOperator();
  const multiplyNode = new OperatorNode(multiplyOperator);
  multiplyNode.position.set({ x: multiplyNode.position.x, y: 50 });
  graph.addNode(multiplyNode);

  graph.connect(
    multiplyNode,
    graph.mainOutput
  );

  graph.connect(
    envelopeNodeA,
    multiplyNode,
    0,
    0
  );

  graph.connect(
    envelopeNodeB,
    multiplyNode,
    0,
    1
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
