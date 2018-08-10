import { createMandatoryContext } from 'utils/context';
import { NotesEditorLayout } from './layout';

import { Notes } from 'core/models/notes';
import { Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

export class NotesEditorCore {
  constructor(public notes: Notes) {}

  layout = new NotesEditorLayout(this);

  snapToGrid = new SnapToGrid();
  keyLayout = new Piano88();
}

const { Provider, Consumer } = createMandatoryContext<NotesEditorCore>();
export { Provider, Consumer };
