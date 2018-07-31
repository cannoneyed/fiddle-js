import { observable } from 'mobx';
import { generateId } from 'utils/generate-id';

import { Note } from './note';
import { TimelineVector } from 'core/primitives/timeline-vector';

// const BEGINNING = new TimelineVector(0);

export class Notes {
  id = generateId();

  @observable length: TimelineVector;

  @observable notes = observable.array<Note>([]);

  constructor(length?: TimelineVector) {
    this.length = length || new TimelineVector(2);
  }

  addNote(note: Note) {
    this.notes.push(note);
  }

  removeNote(note: Note) {
    this.notes.remove(note);
  }
}

export { Note };
