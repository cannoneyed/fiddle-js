import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';

import { Draggable, DragMode, Unregister } from 'core/state/interactions/handlers/draggable';

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
  height: ${() => theme.sectionDividers.dividerSize.toString()};
  background-color: ${theme.colors.lightGray.toRgbString()};
`;

interface HandleProps {
  size: number;
}
const Handle = styled<HandleProps, 'div'>('div')`
  position: absolute;
  z-index: 99;
  height: ${theme.sectionDividers.thumbSize.toString()};
  width: 100%;
  margin-top: ${() => {
    const { thumbSize, dividerSize } = theme.sectionDividers;
    return thumbSize
      .divide(-2)
      .add(dividerSize.divide(2))
      .toString();
  }};
  cursor: row-resize;
`;
