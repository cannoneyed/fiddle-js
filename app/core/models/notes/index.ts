import { computed, observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Note } from './note';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { KeyLayout, Piano88 } from './key-layout';

export class Notes {
  id = generateId();

  @observable length: TimelineVector;

  @observable notes = observable.array<Note>([]);
  @observable keyLayout: KeyLayout = new Piano88();

  constructor(length?: TimelineVector, notes: Note[] = []) {
    this.length = length || new TimelineVector(2);
    this.notes.push(...notes);
  }

  setKeyLayout(keyLayout: KeyLayout) {
    this.keyLayout = keyLayout;
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  removeNote(note: Note) {
    this.notes.remove(note);
  }

  @computed
  get notesByRow() {
    return this.keyLayout.groupByRow(this.notes);
  }
}

export { Note };
