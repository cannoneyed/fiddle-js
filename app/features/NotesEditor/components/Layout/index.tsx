import * as React from 'react';
// import styled, { css } from 'styled-components';
// import theme from 'styles/theme';
import { observer } from 'mobx-react';

// import { SnapToGrid } from 'core/models/snap-to-grid';

// import { Grid } from 'components/Grid';
// import { PianoRoll } from 'components/PianoRoll';
// import { getKeyColor } from 'components/PianoRoll/utils';

// import { Notes } from 'features/NotesEditor/components/Notes';
// import { Consumer } from 'features/NotesEditor/core/context';

@observer
export class Layout extends React.Component<{}, {}> {
  render() {
    return <h1>hey</h1>;
  }
}

// export class Layout extends React.Component<{}, {}> {
//   render() {
//     const { keyLayout, notes, offsetX, offsetY, rowHeight, snapToGrid } = this.props;

//     const { dimensions, offsetXpianoRollDimensions } = this.state.context.layout;

//     const colWidth = SnapToGrid.getDivisionWidth(notes.length, dimensions.width, snapToGrid);
//     const editorWrapperStyle = { ...dimensions };

//     const notesDimensions = {
//       height: dimensions.height,
//       width: dimensions.width - pianoRollDimensions.width,
//     };

//     const gridWrapperStyle = {
//       left: pianoRollDimensions.width,
//     };

//     const notesWrapperStyle = {
//       left: pianoRollDimensions.width,
//     };

//     return (
//       <NoteEditorWrapper style={editorWrapperStyle}>
//         <PianoRollWrapper>
//           <PianoRoll
//             dimensions={pianoRollDimensions}
//             getKeyColor={getKeyColor}
//             keyHeight={rowHeight}
//             keyLayout={keyLayout}
//             offsetY={offsetY}
//           />
//         </PianoRollWrapper>
//         <NotesWrapper style={notesWrapperStyle}>
//           <Notes
//             getScroll={() => ({ x: 1, y: 1 })}
//             handleScroll={() => {
//               console.log('scroll!!');
//             }}
//             keyLayout={keyLayout}
//             notes={notes}
//             offsetX={offsetX}
//             offsetY={offsetY}
//             rowHeight={rowHeight}
//             dimensions={notesDimensions}
//             visibleDimensions={notesDimensions}
//           />
//         </NotesWrapper>
//         <GridWrapper style={gridWrapperStyle}>
//           <Grid
//             colWidth={colWidth}
//             dimensions={notesDimensions}
//             offsetX={0}
//             offsetY={offsetY}
//             rowHeight={rowHeight}
//           />
//         </GridWrapper>
//       </NoteEditorWrapper>
//     );
//   }
// }

// export default Layout;

// const NoteEditorWrapper = styled.div`
//   position: relative;
//   background-color: ${theme.colors.darkGray.toRgbString()};
// `;

// const absolute = css`
//   position: absolute;
//   width: 100%;
//   height: 100%;
// `;

// const NotesWrapper = styled.div`
//   ${absolute};
//   z-index: 1;
// `;

// const GridWrapper = styled.div`
//   ${absolute};
//   z-index: 0;
// `;

// const PianoRollWrapper = styled.div`
//   ${absolute};
//   z-index: 0;
// `;
