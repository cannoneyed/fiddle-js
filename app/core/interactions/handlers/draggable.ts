export type Unregister = () => void;
export type EventHandler = (event: MouseEvent) => void;

export type DragCallback = (deltaX: number, deltaY: number) => void;
export type StartCallback = () => void;
export type EndCallback = () => void;

export class Draggable {
  dragCallback: DragCallback = () => {};
  startCallback: StartCallback = () => {};
  endCallback: EndCallback = () => {};

  onDrag = (callback: DragCallback) => {
    this.dragCallback = callback;
  };

  onDragStart = (callback: StartCallback) => {
    this.startCallback = callback;
  };

  onDragEnd = (callback: EndCallback) => {
    this.endCallback = callback;
  };

  register = (thumb: HTMLElement, container: HTMLElement): Unregister => {
    let mouseDown: EventHandler;

    if (thumb && container) {
      mouseDown = (mouseDown: MouseEvent) => {
        this.startCallback();
        let lastX = mouseDown.pageX;
        let lastY = mouseDown.pageY;

        const mouseMove = (mouseMove: MouseEvent): void => {
          if (!thumb || !container) {
            return;
          }
          const deltaX = mouseMove.pageX - lastX;
          const deltaY = mouseMove.pageY - lastY;

          this.dragCallback(deltaX, deltaY);

          lastX = mouseMove.pageX;
          lastY = mouseMove.pageY;
        };

        const mouseUp = (mouseUp: MouseEvent): void => {
          this.endCallback();
          removeEventHandlers();
        };

        const removeEventHandlers = () => {
          window.removeEventListener('mouseup', mouseUp);
          window.removeEventListener('mousemove', mouseMove);
        };

        const addEventHandlers = () => {
          window.addEventListener('mouseup', mouseUp);
          window.addEventListener('mousemove', mouseMove);
        };

        mouseDown.stopPropagation();
        mouseDown.preventDefault();
        addEventHandlers();
      };

      thumb.addEventListener('mousedown', mouseDown);
    }

    return function unregisterHandlers(): void {
      if (thumb && container) {
        thumb.removeEventListener('mousedown', mouseDown);
      }
    };
  };
}
