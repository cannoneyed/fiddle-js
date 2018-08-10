import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injectCore } from 'features/NotesEditor/core';

import { Dimensions } from 'core/interfaces';
import { KeyLayout } from 'core/models/notes/key-layout';
import { Notes as NotesModel } from 'core/models/notes';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Grid } from 'components/Grid';
import { PianoRoll } from 'components/PianoRoll';

import Notes from 'features/NotesEditor/components/Notes';

interface Props {}

interface InjectedProps {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  keyLayout: KeyLayout;
  notes: NotesModel;
  pianoRollDimensions: Dimensions;
  rowHeight: number;
  snapToGrid: SnapToGrid;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  const { layout, notes } = core;
  return {
    dimensions: layout.dimensions,
    getScroll: layout.scroll.getScroll,
    keyLayout: core.keyLayout,
    notes,
    pianoRollDimensions: layout.pianoRollDimensions,
    rowHeight: layout.rowHeight,
    snapToGrid: core.snapToGrid,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const {
      dimensions,
      getScroll,
      keyLayout,
      notes,
      pianoRollDimensions,
      rowHeight,
      snapToGrid,
    } = this.props;

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
            keyHeight={rowHeight}
            keyLayout={keyLayout}
            getOffsetY={() => getScroll().y}
          />
        </PianoRollWrapper>
        <NotesWrapper style={notesWrapperStyle}>
          <Notes visibleDimensions={notesDimensions} />
        </NotesWrapper>
        <GridWrapper style={gridWrapperStyle}>
          <Grid
            colWidth={colWidth}
            dimensions={notesDimensions}
            getOffset={getScroll}
            rowHeight={rowHeight}
          />
        </GridWrapper>
      </NoteEditorWrapper>
    );
  }
}

// export default withCore<Props, NotesEditorCore>(Consumer)(Layout);
export default inject(Layout);

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
