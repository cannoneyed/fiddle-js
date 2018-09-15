import { Service } from 'libs/typedi';
import { action, computed, observable } from 'mobx';

import { Coordinates } from 'core/interfaces';
import { Node, Port } from 'core/models/graph';

@Service()
export default class __PortInteractions {
  @observable
  isDragging = false;

  @observable
  startPosition: Coordinates = { x: 0, y: 0 };
  @observable
  endPosition: Coordinates = { x: 0, y: 0 };

  @computed
  get draggingConnection() {
    return { startPosition: this.startPosition, endPosition: this.endPosition };
  }

  @action
  beginDragFromClick = (startEvent: MouseEvent, port: Port) => {
    const startPosition = {
      x: port.node.position.x + port.position.x,
      y: port.node.position.y + port.position.y,
    };

    this.endPosition = {
      ...startPosition,
    };

    this.startPosition = startPosition;
    this.isDragging = true;

    const { pageX: startPageX, pageY: startPageY } = startEvent;
    const handleMouseMove = (event: MouseEvent) => {
      const delta = { x: startPageX - event.pageX, y: startPageY - event.pageY };
      this.endPosition = { x: startPosition.x - delta.x, y: startPosition.y - delta.y };
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  @action
  handleDrag = (node: Node, deltaPosition: Coordinates) => {
    if (!this.isDragging) {
      this.isDragging = true;
    }
  };

  @action
  endDrag = () => {
    this.isDragging = false;
  };
}
