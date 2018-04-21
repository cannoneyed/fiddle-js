import * as React from 'react';
import styled from 'styled-components';

import { Draggable, DragMode, Unregister } from 'core/interactions/handlers/draggable';

interface Props {
  onDrag: (deltaY: number) => void;
}

export class SectionDivider extends React.Component<Props, {}> {
  draggable = new Draggable({ mode: DragMode.absolute });
  unregisterDragHandler: Unregister;

  dividerRef: HTMLDivElement;

  componentDidMount() {
    const { draggable } = this;
    draggable.onDrag(this.onDrag);
    this.unregisterDragHandler = this.draggable.register(this.dividerRef!, this.dividerRef!);
  }

  componentWillUnmount() {
    this.unregisterDragHandler();
  }

  onDrag = (deltaX: number, deltaY: number) => {
    this.props.onDrag(deltaY);
  };

  render() {
    return (
      <Divider innerRef={ref => (this.dividerRef = ref)}>
        <Handle id="handle" size={20} />
      </Divider>
    );
  }
}

export default SectionDivider;

const Divider = styled.div`
  width: 100%;
  height: ${props => props.theme.sectionDividers.dividerSize};
  background-color: white;
`;

interface HandleProps {
  size: number;
}
const Handle = styled<HandleProps, 'div'>('div')`
  position: absolute;
  z-index: 99;
  height: ${props => props.theme.sectionDividers.thumbSize};
  width: 100%;
  margin-top: ${props => {
    const { thumbSize, dividerSize } = props.theme.sectionDividers;
    return thumbSize.divide(-2).add(dividerSize.divide(2));
  }};
  cursor: row-resize;
`;
