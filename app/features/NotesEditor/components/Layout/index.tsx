import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Stage, Layer } from 'react-konva';
import { hot, injector } from 'utils/injector';

import { Dimensions } from 'core/interfaces';
import { KeyLayout } from 'core/models/notes/key-layout';
import { Notes as NotesModel } from 'core/models/notes';
import { SnapToGrid } from 'core/models/snap-to-grid';

import { Grid } from 'components/Grid';
import { PianoRoll } from 'components/PianoRoll';

import Notes from 'features/NotesEditor/components/Notes';

import { get, NotesEditorLayout, NotesEditorState } from 'features/NotesEditor/core';

interface Props {
  notes: NotesModel;
}

interface InjectedProps {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  keyLayout: KeyLayout;
  pianoRollDimensions: Dimensions;
  rowHeight: number;
  snapToGrid: SnapToGrid;
}

const inject = injector<Props, InjectedProps>(props => {
  const layout = get(props.notes, NotesEditorLayout);
  const state = get(props.notes, NotesEditorState);

  return {
    dimensions: layout.dimensions,
    getScroll: layout.scroll.getScroll,
    keyLayout: state.keyLayout,
    pianoRollDimensions: layout.pianoRollDimensions,
    rowHeight: layout.rowHeight,
    snapToGrid: state.snapToGrid,
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
          <Layer>
            <Grid
              colWidth={colWidth}
              dimensions={notesDimensions}
              position={notesPosition}
              getOffset={getScroll}
              rowHeight={rowHeight}
            />
            <Notes visibleDimensions={notesDimensions} position={notesPosition} notes={notes} />
            <PianoRoll
              dimensions={pianoRollDimensions}
              keyHeight={rowHeight}
              keyLayout={keyLayout}
              getOffsetY={() => getScroll().y}
            />
          </Layer>
        </Stage>
      </NoteEditorWrapper>
    );
  }
}

export default inject(hot(module)(Layout));

const NoteEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;
