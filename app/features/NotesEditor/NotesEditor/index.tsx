import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Grid from 'components/Grid';
import PianoRoll from 'components/PianoRoll';

const PIANO_ROLL_WIDTH = 20;

interface Props {
  notes: NotesModel;
  dimensions: Dimensions;
  snapToGrid: SnapToGrid;
  rowHeight: number;
}

const getKeyColor = (keyIndex: number) => {
  const key = keyIndex % 12;
  let white = true;
  if (key === 1 || key === 3 || key === 6 || key === 8 || key === 10) white = false;
  return white ? '#EEE' : '#444';
};

@observer
export class NotesEditor extends React.Component<Props, {}> {
  render() {
    const { dimensions, notes, rowHeight, snapToGrid } = this.props;

    const editorWrapperStyle = {
      ...dimensions,
    };

    const pianoRollWidth = PIANO_ROLL_WIDTH;
    const colWidth = SnapToGrid.getDivisionWidth(notes.length, dimensions.width, snapToGrid);

    const pianoRollDimensions = {
      height: dimensions.height,
      width: pianoRollWidth,
    };

    const gridDimensions = {
      height: dimensions.height,
      width: dimensions.width - pianoRollDimensions.width,
    };

    const gridWrapperStyle = {
      left: pianoRollDimensions.width,
    };

    return (
      <NoteEditorWrapper style={editorWrapperStyle}>
        <PianoRollWrapper>
          <PianoRoll
            dimensions={pianoRollDimensions}
            keyHeight={rowHeight}
            offsetY={0}
            getKeyColor={getKeyColor}
          />
        </PianoRollWrapper>
        <GridWrapper style={gridWrapperStyle}>
          <Grid
            dimensions={gridDimensions}
            colWidth={colWidth}
            rowHeight={rowHeight}
            offsetX={0}
            offsetY={0}
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

const GridWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;

const PianoRollWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;
