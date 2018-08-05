import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';
import { KeyLayout } from 'core/models/notes/key-layout';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Grid } from 'components/Grid';
import { PianoRoll } from 'components/PianoRoll';
import { getKeyColor } from 'components/PianoRoll/utils';

import { Notes } from 'features/NotesEditor/components/Notes';
import { NotesEditorLayout } from 'features/NotesEditor/core/layout';

const PIANO_ROLL_WIDTH = 20;

interface Props {
  keyLayout: KeyLayout;
  dimensions: Dimensions;
  notes: NotesModel;
  offsetX: number;
  offsetY: number;
  rowHeight: number;
  snapToGrid: SnapToGrid;
}

@observer
export class NotesEditor extends React.Component<Props, {}> {
  layout = new NotesEditorLayout();

  render() {
    const { dimensions, keyLayout, notes, offsetX, offsetY, rowHeight, snapToGrid } = this.props;

    const editorWrapperStyle = {
      ...dimensions,
    };

    const pianoRollWidth = PIANO_ROLL_WIDTH;
    const colWidth = SnapToGrid.getDivisionWidth(notes.length, dimensions.width, snapToGrid);

    const pianoRollDimensions = {
      height: dimensions.height,
      width: pianoRollWidth,
    };

    const notesDimensions = {
      height: dimensions.height,
      width: dimensions.width - pianoRollDimensions.width,
    };

    const gridWrapperStyle = {
      left: pianoRollDimensions.width,
    };

    const notesWrapperStyle = {
      left: pianoRollDimensions.width,
    };

    return (
      <NoteEditorWrapper style={editorWrapperStyle}>
        <PianoRollWrapper>
          <PianoRoll
            dimensions={pianoRollDimensions}
            getKeyColor={getKeyColor}
            keyHeight={rowHeight}
            keyLayout={keyLayout}
            offsetY={offsetY}
          />
        </PianoRollWrapper>
        <NotesWrapper style={notesWrapperStyle}>
          <Notes
            getScroll={() => ({ x: 1, y: 1 })}
            handleScroll={() => {
              console.log('scroll!!');
            }}
            keyLayout={keyLayout}
            notes={notes}
            offsetX={offsetX}
            offsetY={offsetY}
            rowHeight={rowHeight}
            dimensions={notesDimensions}
            visibleDimensions={notesDimensions}
          />
        </NotesWrapper>
        <GridWrapper style={gridWrapperStyle}>
          <Grid
            colWidth={colWidth}
            dimensions={notesDimensions}
            offsetX={0}
            offsetY={offsetY}
            rowHeight={rowHeight}
          />
        </GridWrapper>
      </NoteEditorWrapper>
    );
  }
}

export default NotesEditor;

const NoteEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

const absolute = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NotesWrapper = styled.div`
  ${absolute};
  z-index: 1;
`;

const GridWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;

const PianoRollWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;
