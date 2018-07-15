import React from 'react';
import { storiesOf } from '@storybook/react';

import { EnvelopeEditor } from 'features/EnvelopeEditor/EnvelopeEditor';

import { Envelope, LineConnection, Point } from 'core/models/envelope';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';

storiesOf('Envelope Editor', module).add('default', () => {
  const start = new TimelineVector(0);
  const length = new TimelineVector(2);
  const envelope = new Envelope(length);

  const a = new Point(start, 1);
  const b = new Point(length, 0);
  envelope.addPoint(a);
  envelope.addPoint(b);
  const c = new LineConnection(a, b);
  envelope.addConnection(c);

  const height = 500;
  const width = 1000;

  const snapToGrid = new SnapToGrid(snapToGridValues.snap_1_4);

  return (
    <EnvelopeEditor dimensions={{ height, width }} envelope={envelope} snapToGrid={snapToGrid} />
  );
});
