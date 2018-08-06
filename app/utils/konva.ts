import * as Konva from 'konva';

export interface KonvaEvent<E extends MouseEvent, T extends Konva.Shape> {
  currentTarget: Konva.Stage;
  evt: E;
  target: T;
}
