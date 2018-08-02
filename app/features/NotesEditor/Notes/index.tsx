import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';

interface Props {
  dimensions: Dimensions;
  nKeys: number;
  notes: NotesModel;
  rowHeight: number;
  offsetX: number;
  offsetY: number;
}

@observer
export class Notes extends React.Component<Props, {}> {
  render() {
    const { notes, rowHeight } = this.props;
    return (
      <NotesWrapper>
        {notes.notes.map(note => {
          const noteStyle = {
            top: 0,
            left: 0,
            height: rowHeight,
            width: 100,
          };
          return <Note key={note.id} style={noteStyle} />;
        })}
      </NotesWrapper>
    );
  }
}

export default Notes;

const Note = styled.div`
  box-style: border-box;
  border: 1px solid ${theme.colors.white.toRgbString()};
  background-color: purple;
`;

const NotesWrapper = styled.div`
  position: absolute;
`;
