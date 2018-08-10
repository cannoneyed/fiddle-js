import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { NotesEditorCore, Consumer } from 'features/NotesEditor/core';
import { injectCore } from 'utils/context';

import { SnapToGrid } from 'core/models/snap-to-grid';

import { Grid } from 'components/Grid';
import { PianoRoll } from 'components/PianoRoll';
import { getKeyColor } from 'components/PianoRoll/utils';

import { Notes } from 'features/NotesEditor/components/Notes';

interface Props {}

interface InjectedProps {
  core: NotesEditorCore;
  getScroll: () => { x: number; y: number };
}

const inject = injectCore<Props, InjectedProps, NotesEditorCore>(Consumer, (_, core) => {
  const { scroll } = core.layout;
  return {
    core,
    getScroll: scroll.getScroll,
  };
});

@observer
export class Layout extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { core, getScroll } = this.props;

    const { layout, notes, keyLayout, snapToGrid } = core;
    const { dimensions, pianoRollDimensions, rowHeight } = layout;

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
            getOffsetY={() => getScroll().y}
          />
        </PianoRollWrapper>
        <NotesWrapper style={notesWrapperStyle}>
          <Notes
            getScroll={getScroll}
            handleScroll={(deltaX: number, deltaY: number) => {
              core.layout.scroll.handleScroll(deltaX, deltaY);
            }}
            keyLayout={keyLayout}
            notes={notes}
            rowHeight={rowHeight}
            dimensions={notesDimensions}
            visibleDimensions={notesDimensions}
          />
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
