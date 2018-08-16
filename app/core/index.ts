// From actions
export { default as ClipActions } from 'core/actions/clip';
export { default as TrackActions } from 'core/actions/track';

// From services
export { default as LoadService } from 'core/services/load';
export { default as UndoService } from 'core/services/undo';

// From state/app
export { default as ClipEditorState } from 'core/state/app/clip-editor';
export { default as TimelineState } from 'core/state/app/clip-editor/timeline';

// From state/layouts
export { default as MainPageLayout } from 'core/state/layouts/pages/main';
export { default as WindowLayout } from 'core/state/layouts/window';

// From state/stores
export { default as DraggedClips } from 'core/state/stores/clips/dragged';
export { default as ClipStore } from 'core/state/stores/clips';
export { default as SnipStore } from 'core/state/stores/snips';
export { default as TrackStore } from 'core/state/stores/tracks';

import { registerSevices as registerSequencerServices } from 'features/Sequencer/core';

export function registerServices() {
  registerSequencerServices();
}
