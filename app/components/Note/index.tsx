import * as React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Note as NoteModel } from 'core/models/notes/note';

interface Props {
  dimensions: Dimensions;
  note: NoteModel;
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any;
  isDragging?: boolean;
}

@observer
export class Note extends React.Component<Props, {}> {
  render() {
    const { dimensions, note, onMouseDown } = this.props;
    const { height, width } = dimensions;

    return (
      <NoteContainer
        height={height}
        width={width}
        isSelected={note.isSelected}
        isDragging={note.isDragging}
        onMouseDown={onMouseDown}
      />
    );
  }
}

export default Note;

export interface NoteContainerProps {
  height: number;
  width: number;
  isSelected: boolean;
  isDragging: boolean;
}
export const NoteContainer = styled<NoteContainerProps, 'div'>('div')`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};
  border: solid 2px #ccc;
  opacity: ${props => (props.isDragging ? 0.5 : 1)};

  height: ${props => props.height}px;
  width: ${props => props.width + 1}px;
`;
