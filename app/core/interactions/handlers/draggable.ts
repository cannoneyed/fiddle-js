export type Unregister = () => void;
export type EventHandler = (event: MouseEvent) => void;

export type DragCallback = (deltaX: number, deltaY: number) => void;
export type StartCallback = () => void;
export type EndCallback = () => void;

export const enum DragMode {
  absolute = 'absolute',
  percent = 'percent',
}

export interface Options {
  mode: DragMode;
}

type OnMouseMove = (event?: MouseEvent) => void;
type OnMouseUp = (event?: MouseEvent) => void;

const defaultOptions = {
  mode: DragMode.percent,
};

export class Draggable {
  mode: DragMode;

  constructor(options: Options = defaultOptions) {
    this.mode = options.mode;
  }

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

  register = (container: HTMLElement, thumb: HTMLElement): Unregister => {
    let mouseDown: EventHandler;

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

        if (this.mode === DragMode.percent) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const thumbWidth = thumb.clientWidth;
          const thumbHeight = thumb.clientHeight;
          const scrollableWidth = containerWidth - thumbWidth;
          const scrollableHeight = containerHeight - thumbHeight;
          const deltaPercentX = scrollableWidth > 0 ? deltaX / scrollableWidth : 0;
          const deltaPercentY = scrollableHeight > 0 ? deltaY / scrollableHeight : 0;

          this.dragCallback(deltaPercentX, deltaPercentY);
        } else if (this.mode === DragMode.absolute) {
          this.dragCallback(deltaX, deltaY);
        }

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

    return function unregisterHandlers(): void {
      if (thumb && container) {
        thumb.removeEventListener('mousedown', mouseDown);
      }
    };
  };
}

export const makeDragHandler = (onMouseMove: OnMouseMove, onMouseUp: OnMouseUp) => (
  event: React.MouseEvent
) => {
  const mouseMove = (event: MouseEvent) => {
    onMouseMove(event);
  };

  const mouseUp = (event: MouseEvent) => {
    onMouseUp(event);
    document.removeEventListener('mouseup', mouseUp);
    document.removeEventListener('mousemove', mouseMove);
  };

  document.addEventListener('mouseup', mouseUp);
  document.addEventListener('mousemove', mouseMove);
};
