import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Wrapper } from './helpers';

import { NotesEditor } from 'features/NotesEditor/components/NotesEditor';
import { NotesEditorCore } from 'features/NotesEditor/core/context';

import { Notes } from 'core/models/notes';
import { Note } from 'core/models/notes/note';
import { TimelineVector } from 'core/primitives/timeline-vector';

const stories = storiesOf('NotesEditor', module);
stories.addDecorator(withKnobs);

stories.add('default', () => {
  const length = new TimelineVector(2);

  const QUARTER = new TimelineVector(0, 1);

  const index = 87;

  const notes = [
    new Note(new TimelineVector(1), QUARTER, index),
    new Note(new TimelineVector(1), QUARTER, index - 2),
    new Note(new TimelineVector(1), QUARTER, index - 4),
  ];

  const notesGroup = new Notes(length, notes);

  const core = new NotesEditorCore(notesGroup);

  return (
    <Wrapper>
      <NotesEditor core={core} />
    </Wrapper>
  );
});
