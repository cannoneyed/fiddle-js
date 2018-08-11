import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { Wrapper } from './helpers';

import { NotesEditor } from 'features/NotesEditor';

import { Notes } from 'core/models/notes';
import { Note } from 'core/models/notes/note';
import { Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';
import { TimelineVector } from 'core/primitives/timeline-vector';

const stories = storiesOf('NotesEditor', module);
stories.addDecorator(withKnobs);

const getSnapToGrid = (key: string) => {
  return new SnapToGrid(snapToGridValues[key]);
};

const length = new TimelineVector(2);
const QUARTER = new TimelineVector(0, 1);
const top = 87;

const makeNotesGroup = () => [
  new Note(new TimelineVector(1), QUARTER, top),
  new Note(new TimelineVector(1), QUARTER, top - 2),
  new Note(new TimelineVector(1), QUARTER, top - 4),
];

const makeNotes = () => new Notes(length, makeNotesGroup());

stories.add('default', () => {
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
    min: 10,
    max: 50,
    step: 1,
  });

  const keyLayout = new Piano88();
  const snapToGridOptions = Object.keys(snapToGridValues);
  const defaultValue = 'snap_1_4';
  const snapValue = select('Snap To Grid', snapToGridOptions, defaultValue);

  const props = {
    keyLayout,
    dimensions: { height, width },
    notes: makeNotes(),
    rowHeight,
    snapToGrid: getSnapToGrid(snapValue),
  };
  return (
    <Wrapper>
      <NotesEditor {...props} />
    </Wrapper>
  );
});
