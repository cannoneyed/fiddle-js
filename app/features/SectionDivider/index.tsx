import * as React from 'react';
import styled from 'styled-components';

import { Draggable, DragMode, Unregister } from 'core/interactions/handlers/draggable';

interface Props {
  handleDrag: (deltaY: number) => void;
}

export class SectionDivider extends React.Component<Props, {}> {
  draggable = new Draggable({ mode: DragMode.absolute });
  unregisterDragHandler: Unregister;

  dividerRef: HTMLDivElement;

  componentDidMount() {
    const { draggable } = this;
    draggable.onDrag(this.handleDrag);
    this.unregisterDragHandler = this.draggable.register(this.dividerRef!, this.dividerRef!);
  }

  componentWillUnmount() {
    this.unregisterDragHandler();
  }

  handleDrag = (deltaX: number, deltaY: number) => {
    this.props.handleDrag(deltaY);
  };

  render() {
    return <Divider innerRef={ref => (this.dividerRef = ref)} />;
  }
}

export default SectionDivider;

const Divider = styled.div`
  width: 100%;
  height: 10px;
  background-color: black;
  cursor: row-resize;
`;
