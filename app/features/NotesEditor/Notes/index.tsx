import * as React from 'react';
import { autorun, IReactionDisposer } from 'mobx';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { Notes as NotesModel } from 'core/models/notes';
import { KeyLayout } from 'core/models/notes/key-layout';

import { RowVisibilityHelper } from './helpers';

interface Props {
  dimensions: Dimensions;
  getScroll: () => { x: number; y: number };
  handleScroll: (x: number, y: number) => void;
  keyLayout: KeyLayout;
  notes: NotesModel;
  rowHeight: number;
  offsetX: number;
  offsetY: number;
  visibleDimensions: Dimensions;
}

@observer
export class Notes extends React.Component<Props, {}> {
  private disposeScrollObserver: IReactionDisposer;
  private notesAreaContainerRef = React.createRef<HTMLDivElement>();
  private rowVisibilityHelper = new RowVisibilityHelper();

  componentDidMount() {
    this.disposeScrollObserver = autorun(this.handleScrollChange);
  }

  componentWillUnmount() {
    this.disposeScrollObserver();
  }

  handleMouseWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    event.preventDefault();
    this.props.handleScroll(deltaX, deltaY);
  };

  handleScrollChange = () => {
    const { x, y } = this.props.getScroll();
    const transform = `translate3d(${-Math.round(x)}px,${-Math.round(y)}px,0px)`;
    const tracksAreaContainer = this.notesAreaContainerRef.current as HTMLDivElement;
    tracksAreaContainer.style.transform = transform;
  };

  getVisibleRows = () => {
    const { keyLayout, notes, offsetY, rowHeight, visibleDimensions } = this.props;
    const top = offsetY;
    const bottom = offsetY + visibleDimensions.height;

    this.rowVisibilityHelper.rowHeight = rowHeight;
    this.rowVisibilityHelper.computeVisibility(keyLayout.nRows, rowHeight, top, bottom);
    const { startIndex, endIndex } = this.rowVisibilityHelper;
    return notes.notesByRow.slice(startIndex, endIndex);
  };

  render() {
    const { dimensions } = this.props;
    const notesAreaContainerStyle = {
      ...dimensions,
    };

    // const visibleRows = this.getVisibleRows();

    return (
      <NotesAreaContainer
        innerRef={this.notesAreaContainerRef}
        style={notesAreaContainerStyle}
        onWheel={this.handleMouseWheel}
      />
    );
  }
}

export default Notes;

const NotesAreaContainer = styled.div`
  position: absolute;
`;
