import * as React from 'react';
import { observer } from 'mobx-react';
import * as Konva from 'konva';
import { Rect } from 'react-konva';
import { KonvaEvent } from 'utils/konva';

import { Note as NoteModel } from 'core/models/notes/note';

interface Props {
  height: number;
  isDragging: boolean;
  note: NoteModel;
  offsetX: number;
  width: number;
}

interface State {
  isContextMenuOpen: boolean;
}

@observer
export class Note extends React.Component<Props, State> {
  handleMouseDown = (e: KonvaEvent<MouseEvent, Konva.Rect>) => {
    const event = e.evt;
    event.preventDefault();
  };

  render() {
    const { note, height, isDragging, offsetX, width } = this.props;

    const opacity = isDragging ? 0.5 : 1;
    const fill = note.isSelected ? 'purple' : 'gray';

    const borderWidth = 2;
    const borderOffset = borderWidth / 2;

    return (
      <Rect
        x={offsetX + borderOffset}
        y={borderOffset}
        height={height - borderOffset}
        width={width - borderOffset}
        onMouseDown={this.handleMouseDown}
        stroke={'#ccc'}
        strokeWidth={2}
        opacity={opacity}
        fill={fill}
      />
    );
  }
}

export default Note;
