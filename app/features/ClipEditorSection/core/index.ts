import { Container, ObjectType } from 'libs/typedi';

import { default as ClipEditorState } from './state';
import { default as ClipEditorGlobalState } from './global';
import { default as ClipEditorLayout } from './layout';
import { default as ClipEditorTimeline } from './timeline';
import { default as ClipEditorZoom } from './zoom';

import { Clip } from 'core/models/clip';

import { Props } from 'features/ClipEditorSection';

export function get<T>(clip: Clip, type: ObjectType<T>): T {
  return Container.of(clip).get(type);
}

const lastPropsMap = new Map<Clip, Props>();
export function deriveStateFromProps(clip: Clip, props: Props): ClipEditorState {
  const state = get(clip, ClipEditorState);

  const lastProps = lastPropsMap.get(clip);
  lastPropsMap.set(clip, props);
  state.updateFromProps(props);

  // Initialize a newly constructed clip editor core
  if (!state.hasBeenInitialized) {
    resizeTimeline(clip);
    state.hasBeenInitialized = true;
  }

  if (lastProps) {
    if (props.dimensions.width !== lastProps.dimensions.width) {
      resizeTimeline(clip);
    }
  }

  state.clip = clip;
  return state;
}

const resizeTimeline = (clip: Clip) => {
  const layout = get(clip, ClipEditorLayout);
  const { timeline } = get(clip, ClipEditorTimeline);
  timeline.fitToWidth(layout.editAreaDimensions.width, clip.length);
};

export {
  ClipEditorGlobalState,
  ClipEditorState,
  ClipEditorLayout,
  ClipEditorTimeline,
  ClipEditorZoom,
};
