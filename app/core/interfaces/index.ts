import { Envelope } from 'core/models/envelope';

export interface Coordinates {
  x: number;
  y: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Position {
  left: number;
  top: number;
}

export interface Rectangle extends Dimensions, Position {}

// Types for data used in the app
export type Data = Envelope | null;
