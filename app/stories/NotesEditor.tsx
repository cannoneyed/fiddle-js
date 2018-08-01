import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { Wrapper } from './helpers';

import { NotesEditor } from 'features/NotesEditor/NotesEditor';

import { Notes } from 'core/models/notes';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';
import { TimelineVector } from 'core/primitives/timeline-vector';

const getSnapToGrid = (key: string) => {
  return new SnapToGrid(snapToGridValues[key]);
};

const stories = storiesOf('NotesEditor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const length = new TimelineVector(2);
  const notes = new Notes(length);

  const width = number('width', 1000, {
    range: true,
    min: 100,
    max: 2000,
    step: 100,
  });

  const height = number('height', 300, {
    range: true,
    min: 100,
    max: 2000,
    step: 100,
  });

  const rowHeight = number('rowHeight', 20, {
    range: true,
    min: 1,
    max: 50,
    step: 1,
  });

  const snapToGridOptions = Object.keys(snapToGridValues);
  const defaultValue = 'snap_1_4';
  const value = select('Snap To Grid', snapToGridOptions, defaultValue);

  return (
    <Wrapper>
      <NotesEditor
        dimensions={{ height, width }}
        notes={notes}
        rowHeight={rowHeight}
        snapToGrid={getSnapToGrid(value)}
      />
    </Wrapper>
  );
});
