import { Point } from './point';
import { generateId } from 'utils/generate-id';

export class Connection {
  id = generateId();

  constructor(public start: Point, public end: Point) {}
}

export class LineConnection extends Connection {}
