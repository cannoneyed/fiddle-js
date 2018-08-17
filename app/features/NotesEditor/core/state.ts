import { Inject, Service } from 'typedi';
import { action } from 'mobx';

import { Notes } from 'core/models/notes';
import { KeyLayout, Piano88 } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Props } from 'features/NotesEditor';

import { NotesEditorLayout } from 'features/NotesEditor/core';

@Service()
export default class __NotesEditorState {
  @Inject(_ => NotesEditorLayout)
  layout: NotesEditorLayout;

  notes: Notes;

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
