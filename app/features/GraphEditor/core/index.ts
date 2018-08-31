import { Container, ObjectType } from 'libs/typedi';

import { default as GraphEditorLayout } from './layout';
import { default as GraphEditorState } from './state';

import { Clip } from 'core/models/clip';

import { Props } from 'features/GraphEditor';

export function get<T>(clip: Clip, type: ObjectType<T>): T {
  return Container.of(clip).get(type);
}

const lastPropsMap = new Map<Clip, Props>();
export function deriveStateFromProps(clip: Clip, props: Props): GraphEditorState {
  const state = get(clip, GraphEditorState);

  lastPropsMap.set(clip, props);
  state.updateFromProps(props);

  // Initialize a newly constructed clip editor core
  if (!state.hasBeenInitialized) {
    state.hasBeenInitialized = true;
  }

  state.clip = clip;
  return state;
}

export { GraphEditorState, GraphEditorLayout };
