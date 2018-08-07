import * as React from 'react';
import { observer } from 'mobx-react';
import * as Konva from 'konva';
import { Group, Rect } from 'react-konva';
import { KonvaEvent } from 'utils/konva';

import { Note as NoteModel } from 'core/models/notes/note';

import Note from 'features/NotesEditor/components/Note';

interface Props {
  offsetX: number;
  notes: NoteModel[];
  height: number;
  visibleWidth: number;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export class Row extends React.Component<Props, State> {
  handleRowClick = (e: KonvaEvent<MouseEvent, Konva.Rect>) => {
    const event = e.evt;
    event.preventDefault();
    console.log(event);
  };

  render() {
    const { notes, offsetX, height, visibleWidth } = this.props;

    return (
      <Group x={-offsetX}>
        <Rect height={height} width={visibleWidth} onMouseDown={this.handleRowClick} />
        {notes.map((note, index) => {
          return (
            <Note
              key={index}
              height={height}
              isDragging={false}
              note={note}
              offsetX={0}
              width={10}
            />
          );
        })}
      </Group>
    );
  }
}

export default Row;
