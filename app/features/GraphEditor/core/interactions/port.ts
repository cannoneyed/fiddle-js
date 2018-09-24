import { Service } from 'libs/typedi';
import { action, computed, observable } from 'mobx';

import { Coordinates } from 'core/interfaces';
import { Node } from 'core/models/graph/node';
import { Port, InteractionState } from 'core/models/graph/port';

@Service()
export default class __PortInteractions {
  @observable
  isDragging = false;

  @observable
  startPosition: Coordinates = { x: 0, y: 0 };
  @observable
  endPosition: Coordinates = { x: 0, y: 0 };

  @observable
  fromPort: Port | null = null;

  @action
  handleMouseEnter(port: Port) {
    if (!this.isDragging) {
      port.interactionState = InteractionState.HOVER;
    }
    if (this.isDragging && this.fromPort !== null) {
      const canConnect = this.canConnect(this.fromPort, port);
      if (canConnect) {
        port.interactionState = InteractionState.HOVER;
      }
    }
  }

  @action
  handleMouseLeave(port: Port) {
    port.interactionState = InteractionState.NONE;
  }

  @computed
  get draggingConnection() {
    return { startPosition: this.startPosition, endPosition: this.endPosition };
  }

  @action
  beginDragFromClick = (startEvent: MouseEvent, port: Port) => {
    if (this.isDragging) {
      return;
    }

    const startPosition = this.beginDrag(port);

    const { pageX: startPageX, pageY: startPageY } = startEvent;
    const handleMouseMove = (event: MouseEvent) => {
      const delta = { x: startPageX - event.pageX, y: startPageY - event.pageY };
      this.endPosition = { x: startPosition.x - delta.x, y: startPosition.y - delta.y };
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
      this.endDrag();
      document.removeEventListener('mousedown', handleMouseDown);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);
  };

  @action
  beginDrag = (port: Port): Coordinates => {
    const startPosition = {
      x: port.node.position.x + port.position.x,
      y: port.node.position.y + port.position.y,
    };

    this.endPosition = {
      ...startPosition,
    };

    this.fromPort = port;
    this.startPosition = startPosition;
    this.isDragging = true;

    return startPosition;
  };

  private canConnect(from: Port, to: Port) {
    return true;
  }

  @action
  attemptToConnect = (port: Port) => {};

  @action
  handleDrag = (node: Node, deltaPosition: Coordinates) => {
    if (!this.isDragging) {
      this.isDragging = true;
    }
  };

  @action
  endDrag = () => {
    this.isDragging = false;
    this.fromPort = null;
  };
}
