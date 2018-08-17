import * as React from 'react';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes } from 'core/models/notes';
import { KeyLayout } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { getState } from 'features/NotesEditor/core';

import Layout from 'features/NotesEditor/components/Layout';

export interface Props {
  dimensions: Dimensions;
  keyLayout: KeyLayout;
  notes: Notes;
  rowHeight: number;
  snapToGrid: SnapToGrid;
}

@observer
export class NotesEditor extends React.Component<Props, {}> {
  static getDerivedStateFromProps(props: Props) {
    const { notes } = props;
    const state = getState(notes);
    state.updateFromProps(props);
    return {};
  }

  render() {
    const { notes } = this.props;
    return <Layout notes={notes} />;
  }
}

export default NotesEditor;
