import { Container, ObjectType } from 'typedi';

import { default as ClipEditorState } from './state';
import { default as ClipEditorGrid } from './grid';
import { default as ClipEditorLayout } from './layout';
import { default as ClipEditorTimeline } from './timeline';
import { default as ClipEditorZoom } from './zoom';

import { Clip } from 'core/models/clip';

import { Props } from 'features/ClipEditorSection';

export function get<T>(clip: Clip, type: ObjectType<T>): T {
  return Container.of(clip).get(type);
}

export function processState(clip: Clip, props: Props): ClipEditorState {
  const state = get(clip, ClipEditorState);
  state.updateFromProps(props);

  // Initialize a newly constructed clip editor core
  if (state.newlyConstructed) {
    const grid = get(clip, ClipEditorGrid);
    const layout = get(clip, ClipEditorLayout);
    grid.computeInitialGrid(clip.length, layout.editAreaDimensions);
  }

  state.clip = clip;
  return state;
}

export { ClipEditorState, ClipEditorGrid, ClipEditorLayout, ClipEditorTimeline, ClipEditorZoom };
