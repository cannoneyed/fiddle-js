import * as React from 'react';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';
import { SnapToGrid } from 'core/models/snap-to-grid';

import VerticalGrid from 'components/VerticalGrid';

interface Props {
  notes: NotesModel;
  dimensions: Dimensions;
  snapToGrid: SnapToGrid;
}

@observer
export class NoteEditor extends React.Component<Props, {}> {
  render() {
    const { dimensions, notes, snapToGrid } = this.props;

    const editorWrapperStyle = {
      ...dimensions,
    };

    const gridSegmentWidth = SnapToGrid.getDivisionWidth(
      notes.length,
      dimensions.width,
      snapToGrid
    );

    return (
      <NoteEditorWrapper style={editorWrapperStyle}>
        <NoteSnipWrapper />
        <GridWrapper>
          <VerticalGrid dimensions={dimensions} colWidth={gridSegmentWidth} offsetX={0} />
        </GridWrapper>
      </NoteEditorWrapper>
    );
  }
}

export default NoteEditor;

const NoteEditorWrapper = styled.div`
  position: relative;
  background-color: ${theme.colors.darkGray.toRgbString()};
`;

const absolute = css`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NoteSnipWrapper = styled.div`
  ${absolute};
  z-index: 10;
`;

const GridWrapper = styled.div`
  ${absolute};
  z-index: 0;
`;
