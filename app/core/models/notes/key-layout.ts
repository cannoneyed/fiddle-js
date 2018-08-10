import { range } from 'lodash';
import { Note } from './note';

export interface KeyLayout {
  nRows: number;

  groupByRow: (notes: Note[]) => Note[][];
  getKeyColor: (index: number) => string;
}

export class Piano88 implements KeyLayout {
  nRows = 88;

  getKeyColor(keyIndex: number) {
    const key = keyIndex % 12;

    let white = true;
    if (key === 1 || key === 3 || key === 6 || key === 8 || key === 10) white = false;

    return white ? '#EEE' : '#444';
  }

  groupByRow(notes: Note[]) {
    const rows: Note[][] = range(0, this.nRows).map(() => []);
    for (const note of notes) {
      rows[note.value].push(note);
    }
    return rows;
  }
}
