import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { Wrapper } from './helpers';

import { NotesEditor } from 'features/NotesEditor/components/NotesEditor';

import { Notes } from 'core/models/notes';
import { Note } from 'core/models/notes/note';
import { Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid, snapToGridValues } from 'core/models/snap-to-grid';
import { TimelineVector } from 'core/primitives/timeline-vector';

const getSnapToGrid = (key: string) => {
  return new SnapToGrid(snapToGridValues[key]);
};

const stories = storiesOf('NotesEditor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const length = new TimelineVector(2);

  const QUARTER = new TimelineVector(0, 1);

  const notes = [
    new Note(new TimelineVector(1), QUARTER, 12),
    new Note(new TimelineVector(1), QUARTER, 16),
    new Note(new TimelineVector(1), QUARTER, 19),
  ];

  const notesGroup = new Notes(length, notes);

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

  const offsetX = number('offsetX', 0, {
    range: true,
    min: 0,
    max: 1000,
    step: 1,
  });

  const keyLayout = new Piano88();

  const offsetY = number('offsetY', 0, {
    range: true,
    min: 0,
    max: keyLayout.nRows * rowHeight - height,
    step: 1,
  });

  console.log(rowHeight, keyLayout.nRows * rowHeight);

  const snapToGridOptions = Object.keys(snapToGridValues);
  const defaultValue = 'snap_1_4';
  const value = select('Snap To Grid', snapToGridOptions, defaultValue);

  return (
    <Wrapper>
      <NotesEditor
        dimensions={{ height, width }}
        keyLayout={keyLayout}
        notes={notesGroup}
        offsetX={offsetX}
        offsetY={offsetY}
        rowHeight={rowHeight}
        snapToGrid={getSnapToGrid(value)}
      />
    </Wrapper>
  );
});
