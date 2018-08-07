import * as Konva from 'konva';
import { Coordinates } from 'core/interfaces';

export interface KonvaEvent<E extends MouseEvent, T extends Konva.Shape> {
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
