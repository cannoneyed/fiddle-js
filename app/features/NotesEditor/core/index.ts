import { Container, ObjectType } from 'libs/typedi';

import { default as NotesEditorState } from './state';
export { default as NotesEditorState } from './state';
export { default as NotesEditorLayout } from './layout';
export { default as NotesEditorScroll } from './scroll';

import { Notes } from 'core/models/notes';

export function get<T>(notes: Notes, type: ObjectType<T>): T {
  return Container.of(notes).get(type);
}

export function getState(notes: Notes): NotesEditorState {
  const state = Container.of(notes).get(NotesEditorState);
  state.notes = notes;
  return state;
}
