import { action } from 'mobx';
import { NotesEditorLayout } from './layout';

import { Notes } from 'core/models/notes';
import { KeyLayout, Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Props } from 'features/NotesEditor';

export class NotesEditorCore {
  constructor(public notes: Notes) {}

  layout = new NotesEditorLayout(this);

  snapToGrid = new SnapToGrid();
  keyLayout: KeyLayout = new Piano88();

  @action
  updateFromProps(props: Props) {
    this.layout.dimensions = props.dimensions;
    this.layout.rowHeight = props.rowHeight;
    this.keyLayout = props.keyLayout;
    this.snapToGrid = props.snapToGrid;
  }
}

const coreRegister = new Map<Notes, NotesEditorCore>();
export function getCore(notes: Notes) {
  const core = coreRegister.has(notes) ? coreRegister.get(notes)! : new NotesEditorCore(notes);
  coreRegister.set(notes, core);
  return core;
}
