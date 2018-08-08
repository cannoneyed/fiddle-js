import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { NotesEditorCore, Consumer } from 'features/NotesEditor/core';
import { withCore } from 'utils/context';

import { SnapToGrid } from 'core/models/snap-to-grid';

import { Grid } from 'components/Grid';
import { PianoRoll } from 'components/PianoRoll';
import { getKeyColor } from 'components/PianoRoll/utils';

import { Notes } from 'features/NotesEditor/components/Notes';

interface Props {}
interface Core {
  core: NotesEditorCore;
}

@observer
export class Layout extends React.Component<Props & Core, {}> {
  render() {
    const { core } = this.props;

    const { notes, keyLayout, snapToGrid } = core;
    const { dimensions, pianoRollDimensions, rowHeight, scrollX, scrollY } = core.layout;

    const colWidth = SnapToGrid.getDivisionWidth(notes.length, dimensions.width, snapToGrid);
    const editorWrapperStyle = { ...dimensions };

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
            offsetY={scrollY}
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
            offsetX={scrollX}
            offsetY={scrollY}
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
            offsetY={scrollY}
            rowHeight={rowHeight}
          />
        </GridWrapper>
      </NoteEditorWrapper>
    );
  }
}

export default withCore<Props, NotesEditorCore>(Consumer)(Layout);

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
