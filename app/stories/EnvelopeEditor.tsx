import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { Wrapper } from './helpers';

import { EnvelopeEditor } from 'features/EnvelopeEditor/EnvelopeEditor';

import { Envelope, Point } from 'core/models/envelope';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';

const getSnapToGrid = (key: string) => {
  return new SnapToGrid(snapToGridValues[key]);
};

const stories = storiesOf('Envelope Editor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const start = new TimelineVector(0);
  const length = new TimelineVector(2);
  const envelope = new Envelope(length);

  const a = new Point(start, 0.75);
  const b = new Point(length, 0.25);
  envelope.addPoint(a);
  envelope.addPoint(b);

  const height = 500;
  const width = 1000;

  const snapToGridOptions = Object.keys(snapToGridValues);
  const defaultValue = 'snap_1_4';
  const value = select('Snap To Grid', snapToGridOptions, defaultValue);

  return (
    <Wrapper>
      <EnvelopeEditor
        dimensions={{ height, width }}
        envelope={envelope}
        snapToGrid={getSnapToGrid(value)}
      />
    </Wrapper>
  );
});
