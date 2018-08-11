import * as Konva from 'konva';
import { Coordinates } from 'core/interfaces';

export interface KonvaEvent<E extends MouseEvent, T extends Konva.Node> {
  cancelBubble?: boolean;
  currentTarget: Konva.Stage;
  evt: E;
  target: T;
}

export const makePoints = (coordinates: Coordinates[]) => {
  return coordinates.reduce((numbers: number[], coordinate) => {
    const { x, y } = coordinate;
    return numbers.concat([x, y]);
  }, []);
};

export function makeHandler<E extends MouseEvent, T extends Konva.Node>(
  handler: (event: E, target: T, currentTarget: Konva.Stage) => void
) {
  return function handleKonvaEvent(e: KonvaEvent<E, T>) {
    const { currentTarget, evt, target } = e;
    e.cancelBubble = true;
    evt.cancelBubble = true;
    evt.preventDefault();
    evt.stopPropagation();
    handler(evt, target, currentTarget);
  };
}
