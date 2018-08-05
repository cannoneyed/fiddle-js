import { range } from 'lodash';
import { Note } from './note';

export abstract class KeyLayout {
  nRows = 0;

  abstract groupByRow(notes: Note[]): Note[][];
}

export class Piano88 extends KeyLayout {
  nRows = 88;

  groupByRow(notes: Note[]) {
    const rows: Note[][] = range(0, this.nRows).map(() => []);
    for (const note of notes) {
      rows[note.value].push(note);
    }
    return rows;
  }
}
