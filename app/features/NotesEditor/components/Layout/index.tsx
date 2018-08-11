import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { injectCore } from 'features/NotesEditor/core';
import { Stage } from 'react-konva';

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

    const notesPosition = {
      x: pianoRollDimensions.width,
      y: 0,
    };

    return (
      <NoteEditorWrapper style={editorWrapperStyle}>
        <Stage {...dimensions}>
          <PianoRoll
            dimensions={pianoRollDimensions}
            keyHeight={rowHeight}
            keyLayout={keyLayout}
            getOffsetY={() => getScroll().y}
          />
          <Notes visibleDimensions={notesDimensions} position={notesPosition} />
          <Grid
            colWidth={colWidth}
            dimensions={notesDimensions}
            position={notesPosition}
            getOffset={getScroll}
            rowHeight={rowHeight}
          />
        </Stage>
      </NoteEditorWrapper>
    );
  }
}

export default inject(Layout);

const NoteEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;
