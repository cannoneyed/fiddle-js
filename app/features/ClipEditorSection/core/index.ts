import { Container, ObjectType } from 'typedi';

import { default as ClipEditorState } from './state';
export { default as ClipEditorState } from './state';
export { default as ClipEditorGrid } from './grid';
export { default as ClipEditorLayout } from './layout';
export { default as ClipEditorTimeline } from './timeline';
export { default as ClipEditorZoom } from './zoom';

import { Clip } from 'core/models/clip';

export function get<T>(clip: Clip, type: ObjectType<T>): T {
  return Container.of(clip).get(type);
}

export function getState(clip: Clip): ClipEditorState {
  const state = Container.of(clip).get(ClipEditorState);
  state.clip = clip;
  return state;
}
