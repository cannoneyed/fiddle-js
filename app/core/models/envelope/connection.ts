import { Point } from './point';

export class Connection {
  left?: Point;
  right?: Point;
}

export class LineConnection extends Connection {}
