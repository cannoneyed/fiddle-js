import Konva from 'konva';
import { Coordinates } from 'core/interfaces';

export const makePoints = (coordinates: Coordinates[]) => {
  return coordinates.reduce((numbers: number[], coordinate) => {
    const { x, y } = coordinate;
    return numbers.concat([x, y]);
  }, []);
};

export function makeHandler<E extends MouseEvent, T extends Konva.Node = Konva.Rect>(
  handler: (event: E, target?: T) => void
) {
  return function handleKonvaEvent(e: Konva.KonvaEventObject<E>, target?: T) {
    const { evt } = e;
    e.cancelBubble = true;
    evt.cancelBubble = true;
    evt.preventDefault();
    evt.stopPropagation();
    handler(evt, target);
  };
}
