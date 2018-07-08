import React from 'react';
import { storiesOf } from '@storybook/react';
import { EnvelopeEditor } from 'features/EnvelopeEditor/EnvelopeEditor';

import { Envelope } from 'core/models/envelope';
import { Point } from 'core/models/envelope/point';
import { TimelineVector } from 'core/primitives/timeline-vector';

storiesOf('Envelope Editor', module).add('default', () => {
  const start = new TimelineVector(0);
  const length = new TimelineVector(2);
  const envelope = new Envelope(length);
  envelope.addPoint(new Point(start, 1));
  envelope.addPoint(new Point(length, 0));

  const height = 500;
  const width = 1000;

  return <EnvelopeEditor dimensions={{ height, width }} envelope={envelope} />;
});
