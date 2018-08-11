import * as React from 'react';
import { observer } from 'mobx-react';
import { Layer } from 'react-konva';
import { KonvaEvent } from 'utils/konva';
import { injectCore } from 'features/NotesEditor/core';

import { Coordinates, Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';
import { KeyLayout } from 'core/models/notes/key-layout';

import { RowVisibilityHelper } from './helpers';

// import Row from 'features/NotesEditor/components/Row';

interface Props {
  position: Coordinates;
  visibleDimensions: Dimensions;
}

interface InjectedProps {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  handleScroll: (x: number, y: number) => void;
  keyLayout: KeyLayout;
  notes: NotesModel;
  rowHeight: number;
}

const inject = injectCore<Props, InjectedProps>((_, core) => {
  const { dimensions, rowHeight, scroll } = core.layout;
  return {
    dimensions: dimensions,
    getScroll: scroll.getScroll,
    handleScroll: scroll.handleScroll,
    keyLayout: core.keyLayout,
    notes: core.notes,
    rowHeight,
  };
});

@observer
export class Notes extends React.Component<Props & InjectedProps, {}> {
  static defaultProps = {
    position: { x: 0, y: 0 },
  };

  private rowVisibilityHelper = new RowVisibilityHelper();

  handleMouseWheel = (e: KonvaEvent<WheelEvent, any>) => {
    const event = e.evt;
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  getVisibleRowIndices = () => {
    const { getScroll, keyLayout, rowHeight, visibleDimensions } = this.props;
    const offsetY = getScroll().y;
    const top = offsetY;
    const bottom = offsetY + visibleDimensions.height;

    this.rowVisibilityHelper.rowHeight = rowHeight;
    this.rowVisibilityHelper.computeVisibility(keyLayout.nRows, rowHeight, top, bottom);
    return this.rowVisibilityHelper.getIndices();
  };

  render() {
    const { dimensions, position } = this.props;
    // const { dimensions, getScroll, keyLayout, notes, position, rowHeight } = this.props;
    // const offsetX = getScroll().x;
    // const offsetY = getScroll().y;

    // startIndex is a lower number, endIndex is higher
    // const { startIndex, endIndex } = this.getVisibleRowIndices();
    // const visibleRows = notes.notesByRow.slice(startIndex, endIndex);

    return (
      <Layer {...dimensions} {...position} onWheel={this.handleMouseWheel}>
        {/* <Group y={-offsetY}>
          {visibleRows.map((notes, i) => {
            // From the top of the visible set of rows
            const offsetRows = keyLayout.nRows - endIndex;
            // Correct for the fact that we're counting from bottom to top
            const index = visibleRows.length - 1 - i + offsetRows;
            const y = index * rowHeight;

            return (
              <Group key={index} y={y}>
                <Row
                  height={rowHeight}
                  notes={notes}
                  offsetX={offsetX}
                  visibleWidth={dimensions.width}
                />
              </Group>
            );
          })}
        </Group> */}
      </Layer>
    );
  }
}

export default inject(Notes);
