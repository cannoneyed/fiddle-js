import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, withKnobs } from '@storybook/addon-knobs';
import { KonvaWrapper } from './helpers';

import { EnvelopeEditor } from 'features/EnvelopeEditor';

import { Envelope, Point } from 'core/models/envelope';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';
import { Timeline } from 'core/models/timeline';
import { TimelineVector } from 'core/primitives/timeline-vector';

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
  const defaultValue = 'snap_1_2';
  const value = select('Snap To Grid', snapToGridOptions, defaultValue);

  const timeline = new Timeline(envelope.length);
  timeline.fitToWidth(width);

  const dimensions = { height, width };

  const props = {
    dimensions,
    envelope,
    snapToGrid: getSnapToGrid(value),
    timeline,
  };

  return (
    <KonvaWrapper dimensions={dimensions}>
      <EnvelopeEditor {...props} />
    </KonvaWrapper>
  );
});
