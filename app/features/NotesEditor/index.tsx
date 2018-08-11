import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes } from 'core/models/notes';
import { KeyLayout } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { NotesEditorCore, Provider } from 'features/NotesEditor/core';

import Layout from 'features/NotesEditor/components/Layout';

interface Props {
  dimensions: Dimensions;
  keyLayout: KeyLayout;
  notes: Notes;
  rowHeight: number;
  snapToGrid: SnapToGrid;
}

@observer
export class NotesEditor extends React.Component<Props> {
  core: NotesEditorCore;

  constructor(props: Props) {
    super(props);
    const { dimensions, keyLayout, notes, rowHeight, snapToGrid } = props;
    this.core = new NotesEditorCore(notes);
    this.core.keyLayout = keyLayout;
    this.core.layout.dimensions = dimensions;
    this.core.layout.rowHeight = rowHeight;
    this.core.snapToGrid = snapToGrid;
  }

  render() {
    const core = this.core;

    console.log('🍕', core);

    return (
      <Provider value={core}>
        <Layout />
      </Provider>
    );
  }
}

export default NotesEditor;
